import React, { useRef } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import FileAddBtn from "../../components/button/FileAddBtn";
import VerifiedList from "../verified/VerifiedList";
import TopSection from "../../components/sections/TopSection";
import { palette } from "../../theme/themes";

const { width } = Dimensions.get("window");
const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const refRBSheet = useRef();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <TopSection />
        <View style={styles.topSection}>
        <Text style={styles.welcomeText}>DigiLocker</Text>
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome, Rizwan Khan!</Text>
            <Image
              style={styles.profileImage}
              source={{
                uri: "data:image/jpeg;base64,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",
              }}
            />
          </View>
          <Text style={styles.subHeaderText}>
            DigiLocker 'Issued Documents' are at par with original documents as
            per IT ACT, 2000
          </Text>
        </View>

        {/* Issued Documents */}
        <View style={styles.issuedDocuments}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={styles.sectionTitle}>Issued Documents</Text>
            <TouchableOpacity style={styles.seeAllButton}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          <View style={{ zIndex: 3 }}>
            <VerifiedList />
          </View>
        </View>

        {/* Documents you might need */}
        <View style={styles.suggestedDocuments}>
          <Text style={styles.sectionTitle1}>Documents you might need</Text>
          <View style={styles.suggestedRow}>
            <View style={styles.suggestedCard}>
              <Image
                style={styles.suggestedIcon}
                source={{ uri: "https://png.pngtree.com/png-vector/20220226/ourmid/pngtree-card-user-design-icon-vector-png-image_35496584.jpg" }}
              />
              <Text style={styles.suggestedText}>Ration Card</Text>
            </View>
            <View style={styles.suggestedCard}>
              <Image
                style={styles.suggestedIcon}
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3yw8P_jHaZOjrk60C3n2bE_unaoz_iOvc7FJLzEzbfKU-jnOAHKV7fL_8JzXzlySiupY&usqp=CAU" }}
              />
              <Text style={styles.suggestedText}>Registration of Vehicles</Text>
            </View>
            <View style={styles.suggestedCard}>
              <Image
                style={styles.suggestedIcon}
                source={{ uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS67zlzYttLXfsgofDydVdtF-LLHulSvQkP5Q&s" }}
              />
              <Text style={styles.suggestedText}>Income Certificate</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.exploreMoreButton}>
            <Text style={styles.exploreMoreText}>Explore More</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <FileAddBtn refRBSheet={refRBSheet} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    height: '100%'
  },
  topSection: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  welcomeText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  subHeaderText: {
    color: "#fff",
    marginTop: 10,
    fontSize: 14,
  },
  issuedDocuments: {
    padding: 16,
  },
  sectionTitle1: {
    fontSize: 16,
    color: palette.black,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 16,
    color: palette.white,
    fontWeight: "bold",
    marginBottom: 10,
  },
  documentCard: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  docIcon: {
    width: 50,
    height: 50,
  },
  documentDetails: {
    marginLeft: 10,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  docNumber: {
    fontSize: 14,
    color: "#777",
  },
  docIssuer: {
    fontSize: 12,
    color: "#aaa",
  },
  seeAllButton: {
    alignSelf: "flex-end",
    backgroundColor: "#4a47e3",
    padding: 10,
    borderRadius: 5,
  },
  seeAllText: {
    color: "blue",
    backgroundColor: "lightblue",
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  suggestedDocuments: {
    padding: 20,
    marginTop: 10,
  },
  suggestedRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  suggestedCard: {
    alignItems: "center",
  },
  suggestedIcon: {
    width: 50,
    height: 50,
  },
  suggestedText: {
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",
    color: palette.black,
  },
  exploreMoreButton: {
    alignSelf: "center",
  },
  exploreMoreText: {
    color: "#4a47e3",
    fontWeight: "bold",
  },
  promoSection: {
    padding: 20,
    backgroundColor: "#fff",
    marginTop: 10,
  },
  promoImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
});
