
import { View, StyleSheet, Text, Alert, Image, FlatList, ScrollView} from 'react-native';
import Background from '../../components/templates/Background';
import { InputBox } from '../../components/atoms/InputBox';
import { ProfileSVG } from '../../assets/images/ProfileSVG';
import { SvgXml } from 'react-native-svg';
import FontStyles from '../../styles/GlobalFontStyle';
import { ButtonBox } from '../../components/atoms/ButtonBox';
import { CheckBoxes } from '../../components/atoms/CheckBoxes';
import { Divider } from "@rneui/base";
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { BASE_URL } from '../../config/config';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';

interface blogProps{
    image_urls : [String],
    title : String,
    content_body : String,
    create_date : String,
    category_id : Int32
}
export const BlogsScreen = () => {
        // Mock data for 
    const [posts, setPosts] = useState([]);

    const fetchData = async () => {
        try {
            // Make API call and get response
            const {data} = await axios.get(BASE_URL + "blog/fetch-all-blogs");
            // Extract image_urls and title from the response data
            console.log(data)
            const { blog_list } = data
            console.log(blog_list);
            // Map image_urls and create post objects
    
            // Set the fetched posts in the state
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
    useEffect(() => {
        // Fetch data from the API
        fetchData();
    }, []);
    

    const coupon_buckets_url = "https://coupongo-buckets.s3.amazonaws.com/";
    
    const renderPost: React.FC<blogProps> = ({ image_urls, title, content_body, create_date}) => (
        <View style={styles.postContainer}>
        <Image source={{ uri: image_urls }} style={styles.postImage} />
        <Text style={styles.postCaption}>{title}</Text>
        </View>
    );
    
    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>發現更多</Text>
            <FlatList
                data={posts}
                keyExtractor={(item) => item.id}
                renderItem={renderPost}
                numColumns={3}
            />
        </ScrollView>
    );
};
    
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
},
title: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginBottom: 10,
},
postContainer: {
    flex: 1,
    margin: 1,
    aspectRatio: 1,
},
postImage: {
    flex: 1,
},
postCaption: {
    padding: 8,
},
});