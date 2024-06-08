import React, { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  ImageBackground,
  ToastAndroid,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Item, Input, Card, CardItem, Text, Button } from "native-base";
import CustomHeader from "../Layout/CustomHeader";
import font from "../../Theme/font";
import colors from "../../Theme/colors";
import Axios from "axios";

const Post = () => {
  const [posts, setPosts] = useState([]);
  console.log("posts", posts);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPosts([
      {
        body: "In 2023, scientists discovered a new species of giant tortoise in the Galápagos Islands. This remarkable find highlights the biodiversity of the archipelago and underscores the importance of conservation efforts in preserving these unique ecosystems. The new species, named Chelonoidis donfaustoi, is distinguished by its large size and unique shell shape.",
        id: 6,
        title: "New Species of Giant Tortoise Discovered in Galápagos",
        userId: 2,
      },
      {
        body: "Quantum computing has taken a significant leap forward with the development of a 127-qubit processor by IBM. This processor, named 'Eagle', marks a milestone in the field, promising to solve complex problems that are currently beyond the reach of classical computers. The potential applications of quantum computing span across various fields, including cryptography, materials science, and drug discovery.",
        id: 7,
        title: "IBM Unveils 127-Qubit Quantum Processor",
        userId: 2,
      },
      {
        body: "The James Webb Space Telescope, launched by NASA in December 2021, has provided unprecedented views of distant galaxies and star-forming regions. Its advanced infrared capabilities allow scientists to peer through cosmic dust and uncover the mysteries of the early universe. Recent images from the telescope have revealed detailed structures within the Carina Nebula, offering new insights into stellar formation.",
        id: 8,
        title: "James Webb Space Telescope Reveals Universe's Secrets",
        userId: 3,
      },
      {
        body: "A recent study published in Nature Climate Change has highlighted the accelerating impact of global warming on Arctic ice melt. The study, conducted by a team of international researchers, indicates that the Arctic could be ice-free during summer as early as 2035. This rapid melting has profound implications for global sea levels, weather patterns, and ecosystems.",
        id: 9,
        title: "Arctic Ice Melt Accelerates Due to Global Warming",
        userId: 3,
      },
      {
        body: "Renewable energy sources have reached a new milestone, accounting for 29% of global electricity generation in 2023. This growth is driven by significant investments in solar and wind energy, coupled with advancements in energy storage technologies. Countries like Germany and China are leading the way in renewable energy adoption, setting ambitious targets to reduce carbon emissions and combat climate change.",
        id: 10,
        title: "Renewable Energy Sources Hit New Global Milestone",
        userId: 4,
      },
    ]);
  }, []);

  // const getPosts = async () => {
  // 	try {
  // 		setLoading(true)
  // 		const response = await Axios.get(
  // 			'https://jsonplaceholder.typicode.com/posts?_limit=5'
  // 		)
  // 		setPosts(response.data)
  // 		setLoading(false)
  // 	} catch (error) {
  // 		ToastAndroid.show(error.response.data, ToastAndroid.LONG)
  // 	}
  // }

  const addPost = async () => {
    try {
      setLoading(true);

      const data = {
        title,
        body: description,
      };
      const result = await Axios.post(
        "https://jsonplaceholder.typicode.com/posts",
        data
      );
      setPosts([result.data, ...posts]);
      setLoading(false);

      setTitle("");
      setDescription("");
    } catch (error) {
      ToastAndroid.show(error.response.data, ToastAndroid.LONG);
    }
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <CustomHeader />
        <ImageBackground
          source={require("../../Theme/bgImage.png")}
          style={{
            height: 350,
            width: null,
            paddingHorizontal: 16,
          }}
        >
          <View>
            <Text style={styles.userText}>Hello User</Text>
            <Text style={[styles.userText, { fontSize: 14 }]}>
              Articles you may interest to read, or you can add one
            </Text>
          </View>
          <Item style={styles.todoInput}>
            <Input
              placeholder="Title"
              style={{ fontFamily: font.PoppinsRegular, fontSize: 16 }}
              value={title}
              onChangeText={(val) => setTitle(val)}
            />
          </Item>
          <Item style={styles.todoInput}>
            <Input
              placeholder="Description"
              style={{ fontFamily: font.PoppinsRegular, fontSize: 16 }}
              value={description}
              onChangeText={(val) => setDescription(val)}
            />
          </Item>
          <Button
            onPress={addPost}
            style={{
              justifyContent: "center",
              height: 40,
              backgroundColor: colors.purple,
              marginTop: 10,
              borderRadius: 5,
            }}
          >
            <Text>Add</Text>
          </Button>
        </ImageBackground>

        <View style={{ marginTop: -100, paddingHorizontal: 16 }}>
          {!loading ? (
            posts.map((post, index) => (
              <TouchableOpacity key={post.id}>
                <Card
                  style={[styles.cardTodo, { marginBottom: 20 }]}
                >
                  <CardItem style={styles.cardItemTodo}>
                    <Text
                      numberOfLines={1}
                      style={{
                        width: "100%",
                        fontFamily: font.PoppinsBold,
                      }}
                    >
                      {post.title.toUpperCase()}
                    </Text>
                  </CardItem>
                  <CardItem style={[styles.cardItemTodo]}>
                    <Text
                      numberOfLines={3}
                      style={{
                        width: "100%",
                      }}
                    >
                      {post.body}
                    </Text>
                  </CardItem>
                </Card>
              </TouchableOpacity>
            ))
          ) : (
            <View style={{ height: 200 }}>
              <ActivityIndicator size="large" color={colors.purple} />
            </View>
          )}
        </View>
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  userText: {
    fontSize: 26,
    fontFamily: font.PoppinsBold,
    color: colors.white,
  },
  userTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: -350,
  },
  todoInput: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    borderRadius: 5,
    borderColor: "transparent",
    marginTop: 8,
    height: 40,
  },
  cardTodo: {
    flexDirection: "column",
    borderRadius: 5,
    elevation: 0,
    borderColor: "transparent",
  },
  cardItemTodo: {
    borderColor: "transparent",
    backgroundColor: colors.white,
    marginBottom: -12,
  },
});

export default Post;
