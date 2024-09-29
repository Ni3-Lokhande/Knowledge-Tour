

import React, { useEffect, useState } from 'react';
import MyContext from './MyContext';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query } from 'firebase/firestore';
import toast from 'react-hot-toast';
import { fireDb } from '../Firebase/FirebaseConfig';

const MyState = (props) => {
    const [searchKey, setSearchKey] = useState('');
    const [loading, setLoading] = useState(false);
    const [getAllBlog, setGetAllBlog] = useState([]);
    const [id, setId] = useState(null);

    function getAllBlogs() {
      setLoading(true);
      try {
        const q = query(
          collection(fireDb, "blogPost"), // Match this with the collection name in Firestore
          orderBy('createdAt', 'desc')
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let blogArray = [];
          QuerySnapshot.forEach((doc) => {
            blogArray.push({ ...doc.data(), id: doc.id });
          });
    
          setGetAllBlog(blogArray);
          setLoading(false);
        });
        return () => data;
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
    

    useEffect(() => {
      getAllBlogs();
    }, []);


    const deleteBlogs = async (id) => {
      try {
        await deleteDoc(doc(fireDb, "blogPost", id));
        getAllBlogs();
        toast.success("Blog deleted successfully")
      } catch (error) {
        console.log(error);
      }
    }

    return (
      <MyContext.Provider value={{ searchKey, setSearchKey, loading, setLoading, getAllBlog, deleteBlogs, 
                                       id, setId }}>
        {props.children}
      </MyContext.Provider>
    );
}

export default MyState;
