
import React, { useEffect, useState } from "react";
import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, ScrollView, Modal, TouchableWithoutFeedback, FlatList} from "react-native"
import WalletBackground from "../../components/templates/WalletBackground";
import { SvgXml } from "react-native-svg";
import { LikedIcon, UnlikeIcon,CommentIcon } from "../../assets/images/BlogIconSVG";

const BlogPostScreen = ({ route })=>{
    const [like, setLike] = useState(false);
    const [showcontent, setShowContent] = useState(false);
    const {blogPost} = route.params;

    // class BottomPopup extends React.Component{
    //     constructor(props){
    //         super(props)
    //         this.state ={
    //             show: false
    //         }
    //     }
    //     show = () =>{
    //         this.setState({show: true})
    //     }
    //     close = () =>{
    //         this.setState({show:false})
    //     }
    //     renderOutsideTouchable(onTouch: any){
    //         const view = <View style={{flex: 1, width: '100%'}}/>
    //         if (!onTouch) return view

    //         return(
    //             <TouchableWithoutFeedback onPress={onTouch} style={{flex: 1, width: '100%'}}>
    //                 {view}
    //             </TouchableWithoutFeedback>
    //         )
    //     }

    //     renderItem = ({item})=>{
    //         return (
    //             <View style={{height: '15%', flex: 1, alignItems: 'flex-start', marginLeft: '5%', marginTop: '5%'}}>
    //                 <Text style={{fontSize: 18, fontWeight: 'bold', color: '#ffaa05'}}>User {item.id}: {item.comment}</Text>
    //             </View>
    //         )
    //     }

    //     renderSeparator = ()=>{
    //         <View 
    //             style={{
    //                 opacity: 0.1,
    //                 backgroundColor: '#ffaa05'
    //             }}/>

    //     }

    //     render(){
    //         const {data} = this.props
    //         let {show} = this.state
    //         const {onTouchOutside, title} = this.props
    //         return (
    //             <Modal
    //                 animationType={'slide'}
    //                 transparent={true}
    //                 visible={show}
    //                 onRequestClose={this.close}
    //             >
    //                 <View style={{flex: 1, backgroundColor: "#000000AA", justifyContent: 'flex-end'}}>
    //                     {this.renderOutsideTouchable(onTouchOutside)}
    //                     <View style={{
    //                         backgroundColor: '#EEE',
    //                         width: '100%',
    //                         borderTopRightRadius: 30,
    //                         borderTopLeftRadius: 30,
    //                         paddingHorizontal: 10,
    //                         maxHeight: Dimensions.get('window').height *0.4
    //                     }}>

    //                         {/* Title */}
    //                         <Text style={{
    //                             color: '#ffaa05',
    //                             fontSize: 20,
    //                             fontWeight: 'bold',
    //                             margin: 15
    //                         }}>
    //                             {title}
    //                         </Text>

    //                     </View>
    //                     <View>
    //                         <FlatList 
    //                             style={{marginBottom: '5%', backgroundColor:'#EEE'}}
    //                             showsVerticalScrollIndicator={false}
    //                             data={data}
    //                             renderItem={this.renderItem}
    //                             extraData={data}
    //                             keyExtractor={(item,index) => index.toString()}
    //                             ItemSeparatorComponent={this.renderSeparator}
    //                             contentContainerStyle={{
    //                                 paddingBottom: 40,
    //                             }}
    //                         />
    //                     </View>
            
    //                 </View>
    //             </Modal>
    //         )
    //     }
    // }
    // const showPopupComment = () =>{
    //     popupRef.show()
    // }

    // const ClosePopUpComment = () =>{
    //     popupRef.close()
    // }

    // let popupRef = React.createRef()
    useEffect(()=>{
        console.log(blogPost)
    })

    return (
        <WalletBackground main={true} contentHeight="90%" heading="Post">
            <View style={BlogPostStyle.BlogHeading}>
                
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                    <View style={{width: '5%'}}></View>
                    <Image source={ require('../../assets/images/icon.png')} resizeMode="contain"
                    style={{ width: '10%', 
                            height: '50%',
                            borderRadius: 50, 
                            borderWidth:2, 
                            borderColor:'#DC2B37'}}/>
                    <Text style={BlogPostStyle.BlogText}>金記冰室</Text>
                </View>

            </View>
            <View style={BlogPostStyle.BlogImage}>
            </View>
            <View style={BlogPostStyle.BlogAction}>
                <View style={{width: '100%', height: "100%", flexDirection:'row'}}>
                    <View style={{width: '2%'}}></View>
                    <TouchableOpacity style={{width: '10%', 
                                            height: "100%", 
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                    }}
                                    onPress={()=>setLike(!like)}>

                        {like === false ? 
                        <SvgXml xml={UnlikeIcon} width="100%" height="70%"/>
                        :
                        <SvgXml xml={LikedIcon} width="100%" height="70%" />
                        }
                    </TouchableOpacity>
                    {/* Comment Data from Server */}
                    <TouchableOpacity style={{width: '10%', 
                                            height: "100%", 
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                    }}
                    >
                    <SvgXml xml={CommentIcon} width="100%" height="70%"/>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={BlogPostStyle.BlogContent}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width:'2%'}}></View>
                    <Text style={BlogPostStyle.BlogText}>10 likes</Text>
                </View>

                <View style={{width: '100%', flexDirection: 'row', height: '100%'}}>
                    <View style={{width:'2%'}}></View>
                    {/* Blogger Name + Blog Title*/}
                    <View >
                        <Text style={BlogPostStyle.BlogText}>金記冰室: <Text>  </Text> 
                        <Text style={{fontWeight:'normal', color: '#DC2B37', fontSize: 15}}>{blogPost.title}</Text>
                        </Text>
                        { showcontent === false 
                            ?
                            <TouchableOpacity onPress={()=> setShowContent(true)}>
                                <Text style={BlogPostStyle.BlogText} >... more</Text>
                            </TouchableOpacity>
                            :
                        
                            <Text style={{marginTop: '2%', fontWeight:'normal', color: '#DC2B37', fontSize: 14, marginHorizontal: '3%'}}> 
                                {blogPost.content_body}
                            </Text>
                        }
                    </View>
                </View>
            </View>
            {/* <View style={BlogPostStyle.BlogComment}>
                <View style={{flexDirection: 'row'}} >
                    <View style={{width: '2%'}}></View>
                    <TouchableOpacity onPress={showPopupComment}>
                    <Text style={{
                            fontSize: 15, 
                            fontWeight: 'bold', 
                            color: '#BBB', 
                            marginLeft: '3%'
                            }} >查看(Comment Number)用家留言 ...
                    </Text>
                    </TouchableOpacity>
                </View>
                <BottomPopup 
                    ref={(target) => popupRef = target}
                    onTouchOutside={ClosePopUpComment}
                    title={"Comment"}
                    data={datalist}
                />
            </View> */}
    </WalletBackground>
    )
}

const BlogPostStyle = StyleSheet.create({

    BlogHeading:{
        height: '10%',
        width: '100%',
        position: 'absolute',
        backgroundColor:'white',
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
    },
    BlogImage:{
        top: '10%',
        height: '60%',
        backgroundColor: 'pink'
    },
    BlogAction:{
        top: '10%',
        height: '5%',
        // backgroundColor: 'pink'
    },
    BlogContent:{
        top: '10%',
        height: Dimensions.get('window').height * 0.22,
        // backgroundColor: 'orange',
        justifyContent: 'flex-start',
    },
    BlogComment:{
        top: '10%',
        height: '10%',
        backgroundColor: '#EEE'
    },
    BlogText:{
        fontSize:15 ,
        marginHorizontal:'3%',
        color: '#DC2B37', 
        fontWeight: 'bold'
    }
})
export default BlogPostScreen;
