import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import * as Notifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Animatable from "react-native-animatable"; 

export default function HomeScreen({ navigation }) {
  const [user, setUser] = useState(null);
  const [streak, setStreak] = useState(0);
  const totalDays = 75;
  const [tasks, setTasks] = useState({
    task1: false,
    task2: false,
    task3: false,
    task4: false,
    task5: false,
  });

  const progress = streak / totalDays;

  useEffect(() => {
    fetchUserProfile();
    requestNotificationPermission();
  }, []);

  const fetchUserProfile = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");

      if (!token) {
        Alert.alert("Error", "No token found. Please log in again.");
        return;
      }

      const response = await fetch("http://192.168.51.106:4000/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data);
        setStreak(data.streak);
        setTasks(data.tasks || {});
      } else {
        Alert.alert("Error", data.message || "Failed to fetch user profile");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to fetch user profile.");
    }
  };

  const requestNotificationPermission = async () => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Required", "Notifications are disabled.");
    }
  };

  const handleTaskCompletion = (taskKey) => {
    setTasks((prevTasks) => ({
      ...prevTasks,
      [taskKey]: !prevTasks[taskKey],
    }));
  };

  const handleEndOfDay = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      const response = await fetch("http://192.168.51.106:4000/user/updateTask", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tasks }),
      });

      if (response.ok) {
        setUser((prevUser) => ({ ...prevUser, tasks }));
        Alert.alert("Success", "Tasks updated successfully!");
      } else {
        Alert.alert("Error", "Failed to update tasks.");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to update tasks.");
    }
  };

  const taskList = [
    { taskName: "Two 45-minute workouts per day, one outdoors", taskKey: "task1" },
    { taskName: "Drink 1 gallon of water daily", taskKey: "task2" },
    { taskName: "Follow a diet with no cheat meals or alcohol", taskKey: "task3" },
    { taskName: "Read 10 pages of a non-fiction book", taskKey: "task4" },
    { taskName: "Watch a tutorial", taskKey: "task5" },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Animatable.Text style={styles.greeting} animation="fadeIn" duration={1500}>
          {user ? `Hey ${user.fullname.firstname} ${user.fullname.lastname}` : "Hey User"}
        </Animatable.Text>
        <TouchableOpacity style={styles.logoutIcon} onPress={() => navigation.replace("Login")}>
          <Ionicons name="log-out-outline" size={40} color="#FF6347" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollableContent}>
        <TouchableOpacity style={styles.progressContainer}>
          <Animatable.View style={styles.progressBox} animation="bounceIn" duration={1000}>
            <Progress.Bar progress={progress} width={350} height={30} color="#000000" borderWidth={1} borderRadius={8} />
          </Animatable.View>
          <Text style={styles.progressDetails}>{streak}/{totalDays} Streak Days</Text>
        </TouchableOpacity>

        <View style={styles.tasksContainer}>
          <Text style={styles.taskTitle}>Today's Tasks:</Text>
          {taskList.map((task, index) => (
            <Animatable.View key={index} style={styles.taskBox} animation="fadeInUp" delay={index * 200} duration={500}>
              <Text style={styles.taskText}>{index + 1}. {task.taskName}</Text>
              {!tasks[task.taskKey] ? (
                <TouchableOpacity style={styles.completeButton} onPress={() => handleTaskCompletion(task.taskKey)}>
                  <Text style={styles.completeButtonText}>Mark as Complete</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.completedText}>✅ Completed</Text>
              )}
            </Animatable.View>
          ))}
        </View>

        <TouchableOpacity style={styles.endOfDayButton} onPress={handleEndOfDay}>
          <Text style={styles.endOfDayButtonText}>Submit Tasks ✅</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 20, backgroundColor: "#fff", borderBottomWidth: 1, borderBottomColor: "#ddd", paddingTop: 45 },
  greeting: { fontSize: 20, fontWeight: "bold", color: "#000" },
  logoutIcon: { padding: 5 },
  progressContainer: { alignItems: "center", marginTop: 20 },
  progressBox: { backgroundColor: "#ffffff", justifyContent: "center" },
  progressDetails: { fontSize: 14, color: "#555", marginTop: 10 },
  tasksContainer: { paddingLeft: 20, marginTop: 20, width: "90%", alignItems: "flex-start" },
  taskTitle: { paddingTop: 10, fontSize: 30, fontWeight: "700", color: "#000", marginBottom: 15 },
  taskBox: { backgroundColor: "#fff", padding: 15, marginBottom: 10, borderRadius: 8, borderWidth: 1, borderColor: "#ddd", width: "100%" },
  taskText: { fontSize: 18, color: "#000" },
  completeButton: { backgroundColor: "#4CAF50", padding: 10, borderRadius: 5, marginTop: 10, alignItems: "center" },
  completeButtonText: { color: "#fff", fontSize: 16 },
  completedText: { color: "#4CAF50", fontSize: 16, fontWeight: "bold", marginTop: 10 },
  endOfDayButton: { backgroundColor: "#FF6347", padding: 15, borderRadius: 8, marginTop: 20, alignItems: "center" },
  endOfDayButtonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  scrollableContent: { paddingBottom: 60 },
});

