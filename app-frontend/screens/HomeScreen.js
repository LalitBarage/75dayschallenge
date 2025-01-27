import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

export default function HomeScreen({ navigation }) {
  const [daysCompleted, setDaysCompleted] = useState(45);
  const totalDays = 75;

  const progress = daysCompleted / totalDays;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Hey User</Text>
        <TouchableOpacity
          style={styles.profileIcon}
          onPress={() => navigation.navigate("Profile")}
        >
          <Ionicons name="person-circle-outline" size={40} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollableContent}>
        <TouchableOpacity
          style={styles.progressContainer}
          onPress={() => navigation.navigate("Report")}
        >
          <View style={styles.progressRow}>
            <Text style={styles.progressLabel}>Progress:</Text>
            <Text style={styles.progressPercentage}>
              {Math.round(progress * 100)}%
            </Text>
          </View>

          <View style={styles.progressBox}>
            <Progress.Bar
              progress={progress}
              width={350}
              height={30}
              color="#000000"
              borderWidth={1}
              borderRadius={8}
            />
          </View>

          <Text style={styles.progressDetails}>
            {daysCompleted}/{totalDays} Days Completed
          </Text>
        </TouchableOpacity>

        <View style={styles.tasksContainer}>
          <Text style={styles.taskTitle}>Today's Tasks:</Text>
          <View style={styles.taskBox}>
            <Text style={styles.taskText}>1. Drink 2 liters of water</Text>
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskText}>2. 30-minute workout</Text>
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskText}>3. Eat balanced meal</Text>
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskText}>4. Read a book</Text>
          </View>
          <View style={styles.taskBox}>
            <Text style={styles.taskText}>5. Watch tutorials</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingTop: 45,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  profileIcon: {
    padding: 5,
  },
  progressContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  progressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  progressLabel: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  progressBox: {
    backgroundColor: "#ffffff",
    justifyContent: "center",
  },
  progressDetails: {
    fontSize: 14,
    color: "#555",
    marginTop: 10,
  },
  tasksContainer: {
    paddingLeft: 20,
    marginTop: 20,
    width: "90%",
    alignItems: "flex-start",
  },
  taskTitle: {
    paddingTop: 10,
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
    marginBottom: 15,
  },
  taskBox: {
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    width: "100%",
    height: 150,
  },
  taskText: {
    fontSize: 20,
    color: "#000",
  },
  navbar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#fff",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  navItem: {
    padding: 10,
    paddingBottom: 20,
  },
  navText: {
    fontSize: 18,
    fontWeight: "500",
    color: "#000",
  },
  scrollableContent: {
    paddingBottom: 60,
  },
});
