import React from 'react';
import { View, ScrollView, Text, ActivityIndicator, StyleSheet } from 'react-native';

import { Form, Item, Input, Label, Button } from 'native-base';

import Header from '../components/Header';
import colors from '../constants/colors';
import { scale } from '../utils/dimensions';

const CreateTourScreen = ({
  isCreateTourLoading,
  formValues,
  headerTitle,
  errors: { title, description },
  touched,
  dirty,
  buttonTitle,
  isFormValid,
  onGoBackPress,
  handleChange,
  handleBlur,
  handleCreateTourSubmit,
}) => (
  <View style={styles.container}>
    <Header title={headerTitle} isNeedLeft onLeftPress={onGoBackPress} />
    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={styles.contentContainer}>
      <Form>
        <View style={styles.inputContainer}>
          <Item floatingLabel>
            <Label style={styles.inputLabel}>Title</Label>
            <Input
              value={formValues.title}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              style={styles.input}
            />
          </Item>
          {touched.title && title && <Text style={styles.errorText}>{title}</Text>}
        </View>
        <View style={[styles.inputContainer, styles.lastInputContainer]}>
          <Item floatingLabel last>
            <Label style={styles.inputLabel}>Description</Label>
            <Input
              value={formValues.description}
              onChangeText={handleChange('description')}
              onBlur={handleBlur('description')}
              maxLength={150}
              multiline
              style={styles.input}
            />
          </Item>
          {touched.description && description && (
            <Text style={styles.errorText}>{description}</Text>
          )}
        </View>
      </Form>
      <Button
        style={styles.submitBtn}
        block
        disabled={!isFormValid}
        onPress={handleCreateTourSubmit}
      >
        {isCreateTourLoading ? (
          <ActivityIndicator large color={colors.primary} />
        ) : (
          <Text style={styles.buttonTitle}>{buttonTitle}</Text>
        )}
      </Button>
    </ScrollView>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: scale(30),
    paddingTop: scale(70),
    paddingBottom: scale(40),
    justifyContent: 'space-between',
  },
  lastInputContainer: {
    marginTop: scale(20),
  },
  submitBtn: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    maxHeight: scale(120),
  },
  inputLabel: {
    fontSize: scale(20),
    top: 0,
  },
  buttonTitle: {
    color: colors.white,
    fontSize: scale(20),
  },
  errorText: {
    position: 'absolute',
    bottom: -scale(25),
    width: '100%',
    textAlign: 'center',
    color: colors.danger,
  },
});

export default CreateTourScreen;
