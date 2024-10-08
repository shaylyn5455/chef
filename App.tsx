import React, { useState, useRef } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Animated, TouchableOpacity } from 'react-native';


//Title: Chef App
//Author: Yusra
//Date: 22 August 2024
//Version: 1
//Available:https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7B8B4938D0-6B6B-44E4-A2D8-5551E6D3AE27%7D&file=MAST5112MM.docx&action=default&mobileredirect=true

//Title: MAST5122 POE
//Author: Independent Institute Of Education 
//Date: 22 August 2024 
//Version: 1
//Available:https://advtechonline.sharepoint.com/:w:/r/sites/TertiaryStudents/_layouts/15/Doc.aspx?sourcedoc=%7B185B8248-66D7-459F-94BC-9130487467B4%7D&file=MAST5112POE.docx&action=default&mobileredirect=true



type MenuItem = {
  name: string;
  description: string;
  course: string;
  price: string;

};

export default function App() {
  const initialMenuItems: MenuItem[] = [
    { name: 'Fried prawn', description: 'Crispy golden prawns fried to perfection ', course: 'Starter', price: 'R320, 35' },
    { name: 'Baked hake', description: 'Tender baked hake seasoned with herbs and spices.', course: 'Starter', price: 'R250,00' },
    { name: 'Beef ribs', description: 'Juicy, slow-cooked beef ribs glazed in a smoky sauce.', course: 'Entrees', price: ' R385,50' },
    { name: 'Dry aged steak', description: 'Rich and flavorful steak aged for enhanced taste.', course: 'Entrees', price: 'R424.99' },
    { name: 'Grilled Vegetable Ratatouille with Red Pepper Coulis and Quinoa Pilaf:', description: 'A vibrant mix of grilled vegetables with a tangy red pepper sauce, served over fluffy quinoa.', course: 'Entrees', price: 'R385.99' },
  ];

  const [menuItems, setMenuItems] = useState<MenuItem[]>(initialMenuItems);
  const [dishName, setDishName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [course, setCourse] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  const courses = ['Starter', 'Main', 'Dessert'];

  const buttonScale = useRef(new Animated.Value(1)).current;

  const addMenuItem = () => {
    if (dishName && description && course && price ) {
      const newItem: MenuItem = { name: dishName, description, course, price,};
      setMenuItems([...menuItems, newItem]);
      clearForm();
    } else {
      alert('Please fill in all fields');
    }
  };

  const clearForm = () => {
    setDishName('');
    setDescription('');
    setCourse('');
    setPrice('');

  };

  const handlePressIn = () => {
    Animated.spring(buttonScale, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(buttonScale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={styles.viewStyle}>
      <Text style={styles.totalMenuText}>Total Menu Items: {menuItems.length}</Text>

      <Text style={styles.title}>Menu Items</Text>

      <FlatList
        data={menuItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.menuItem}>
            <Text style={styles.menuItemTitle}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text>Course: {item.course}</Text>
            <Text>Price: {item.price}</Text>
          </View>
        )}
      />

      <View style={styles.form}>
        <Text style={styles.formTitle}>Add New Menu Item</Text>

        <TextInput
          style={styles.input}
          placeholder="Dish Name"
          value={dishName}
          onChangeText={setDishName}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
        />

        <Text style={styles.label}>Select Course:</Text>
        {courses.map((courseName) => (
          <Button key={courseName} title={courseName} onPress={() => setCourse(courseName)} />
        ))}
        <Text>Selected Course: {course}</Text>

        <TextInput
          style={styles.input}
          placeholder="Price"
          value={price}
          keyboardType="numeric"
          onChangeText={setPrice}
        />

        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={addMenuItem}
        >
          <Animated.View style={[styles.animatedButton, { transform: [{ scale: buttonScale }] }]}>
            <Text style={styles.buttonText}>Add Item</Text>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewStyle: {
    flex: 1,
    backgroundColor: '#90e0ef',
    padding: 10,
  },
  totalMenuText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
    backgroundColor: '#0077b6',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    backgroundColor: '#f9c2ff',
    padding: 10,
    borderRadius: 5,
    textAlign: 'center',
  },
  menuItem: {
    marginVertical: 10,
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  menuItemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  
  },
  form: {
    marginTop: 20,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#e6f7ff',
    borderRadius: 5,
  },
  formTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#007ACC',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
  },
  animatedButton: {
    backgroundColor: 'blue',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    marginVertical: 5,
    color: '#333',
  },
});