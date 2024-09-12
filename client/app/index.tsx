import { View, Text, Pressable } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';

export default function index() {
  return (
    <View style={{ flex: 1 }}>
      <Link href="/login">
        <Text>Login</Text>
      </Link>
    </View>
  );
}
