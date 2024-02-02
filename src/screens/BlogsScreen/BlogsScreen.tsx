
import { View, StyleSheet, Text, Alert, Image, FlatList, ScrollView, ListRenderItem,TouchableOpacity} from 'react-native';
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

interface BlogProps{
    image_urls : String[],
    cover_image : String,
    title : String,
    content_body : String,
    create_date : String,
    category_id : Int32
}
export const BlogsScreen = ({navigation}) => {
        // Mock data for 
    // const [posts, setPosts] = useState([]);
    const [blogList, setBlogList] = useState<BlogProps[]>([]);
    const fetchData = async () => {
        try {
            const {data} = await axios.get(BASE_URL + "blog/fetch-all-blogs");
            const { blog_list } = data


            console.log(blog_list)
            const imageUrls = blog_list.flatMap((blog : BlogProps) => blog.image_urls.flat());
            // console.log(imageUrls);
            const blogListData: BlogProps[] = blog_list.map((blog: BlogProps) => ({
                image_urls: blog.image_urls.flat(),
                title: blog.title,
                content_body: blog.content_body,
                create_date: blog.create_date,
                category_id: blog.category_id,
                cover_image : blog.image_urls.flat()[0],
              }));
            setBlogList(blogListData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
    useEffect(() => {
        // Fetch data from the API
        fetchData();
    }, []);
    
    const handleViewPress = (item : BlogProps) =>{
        const blogPost = blogList.find((post) => post.title === item.title )
        console.log(blogPost)
        navigation.navigate("BlogPost", {blogPost})
        // console.log(item.category_id);
    }
    const coupon_buckets_url = "https://coupongo-buckets.s3.amazonaws.com/";
    
    const renderPost= ({ item }: { item: BlogProps }) => (
        <TouchableOpacity onPress={() => handleViewPress(item)} style={styles.postContainer} >
        <View style={styles.postContainer}>
            <Image source={{ uri: coupon_buckets_url + item.cover_image}} style={styles.postImage} />
        </View>
        </TouchableOpacity>
    );
    
    return (
        <View style = {styles.container}>
            <View style={{width : "80%", height : "5%", borderRadius : 10, backgroundColor : "white"}}></View>
            <FlatList
            data={blogList}
            keyExtractor={(item) => item.title.toString()}
            renderItem={renderPost}
            numColumns={3}
            />
        </View>
    );
};
    
const styles = StyleSheet.create({
container: {
    flex: 1,
    backgroundColor: 'black',
    // paddingTop: 0,
    zIndex : 0,
    // alignItems : "center"
},
postContainer: {
    flex: 1,
    margin: 1,
    aspectRatio: 1,
    backgroundColor : "white",
    zIndex : 1
},
postImage: {
    flex: 1,
    zIndex: 2,
    backgroundColor : "gray"
}
});