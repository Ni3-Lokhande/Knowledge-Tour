

import React, { useState } from 'react';
import { Container, Row, Col, Card, CardBody, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { fireDb } from '../Firebase/FirebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const CreateBlog = () => {

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(false);

  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const storage = getStorage();
    const storageRef = ref(storage, `blogImages/${file.name}`);
    
    const uploadTask = uploadBytesResumable(storageRef, file);
  
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // Optional: Track upload progress
      },
      (error) => {
        console.error('Image upload failed:', error);
        toast.error("Image upload failed");
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        setImage(downloadURL);  // Store the download URL for use when submitting the blog
      }
    );
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Create a new blog post in Firestore with the image URL
      await addDoc(collection(fireDb, "blogPost"), {
        title,
        category,
        content,
        image,  // This is now the download URL from Firebase Storage
        createdAt: Timestamp.now(),
      });
      
      // Show success toast
      toast.success("Post added successfully");
      
      // Navigate to dashboard
      navigate('/dashboard');
      
    } catch (error) {
      console.error("Error adding post: ", error);
      toast.error("Failed to add post");
    }
  };
  

 


  return (
    <Container style={{paddingTop:'120px'}}>
      <Row className="justify-content-center">
        <Col md="8">
          <Card>
            <CardBody>
              <h3>Create a New Blog</h3>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for="title">Title</Label>
                  <Input
                    type="text"
                    id="title"
                    placeholder="Enter the blog title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="category">Category</Label>
                  <Input
                    type="text"
                    id="category"
                    placeholder="Enter the blog category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for="image">Upload Image</Label>
                  <Input
                    type="file"
                    id="image"
                    onChange={handleImageChange}
                  />
                  {image && <img src={image} alt="Preview" style={{ width: '150px', marginTop: '10px' }} />}
                </FormGroup>
                <FormGroup>
                  <Label for="content">Content</Label>
                  <ReactQuill
                    value={content}
                    onChange={setContent}
                    modules={CreateBlog.modules}
                    formats={CreateBlog.formats}
                    placeholder="Write your blog content here..."
                  />
                </FormGroup>
                <Container className="text-center">
                  <Button color="primary" type="submit">Send</Button>
                  <Button color="secondary" className="ms-2" onClick={() => setPreview(!preview)}>
                    {preview ? 'Edit' : 'Preview'}
                  </Button>
                </Container>
              </Form>
              {preview && (
                <div className="mt-4">
                  <h3>Blog Preview</h3>
                  <Card>
                    <CardBody>
                      <h4>{title}</h4>
                      <p><strong>Category:</strong> {category}</p>
                      {image && <img src={image} alt="Blog Preview" style={{ width: '150px', marginTop: '10px' }} />}
                      <div dangerouslySetInnerHTML={{ __html: content }} />
                    </CardBody>
                  </Card>
                </div>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

// Configurations for ReactQuill
CreateBlog.modules = {
  toolbar: [
    [{ 'header': '1' }, { 'header': '2' }, { 'header': '3' }, { 'header': '4' }, { 'header': '5' }, { 'header': '6' }],
    [{ 'font': [] }],
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    ['bold', 'italic', 'underline'],
    [{ 'align': [] }],
    ['link', 'image'],
    ['clean']
  ],
};

CreateBlog.formats = [
  'header', 'font', 'list', 'bullet', 'bold', 'italic', 'underline', 'align', 'link', 'image'
];

export default CreateBlog;

















