import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import CommonButton from '../components/CommonButton';
import SelectLangModal from '../components/SelectLangModal';

// Validation schema for signup
const signupValidationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm Password is required'),
});

const Signup = () => {
  const [selectLanguage, setSelectLanguage] = useState('English');
  const navigation = useNavigation();
  const [showModal, setShowModal] = useState(false);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.langView}
        onPress={() => {
          setShowModal(true);
        }}>
        <Text style={styles.lang}>{selectLanguage}</Text>
        <Image source={require('../images/dropdown.png')} style={styles.icon} />
      </TouchableOpacity>
      <Text style={styles.wish}>Create Account</Text>
      <Text style={styles.title}>Sign up to get Started!</Text>
      <Formik
        initialValues={{name: '', email: '', password: '', confirmPassword: ''}}
        validationSchema={signupValidationSchema}
        onSubmit={values => console.log(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <TextInput
              placeholder="Name"
              style={styles.input}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              value={values.name}
            />
            {touched.name && errors.name && (
              <Text style={styles.errorText}>{errors.name}</Text>
            )}

            <TextInput
              placeholder="Email"
              style={styles.input}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
              keyboardType="email-address"
            />
            {touched.email && errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              placeholder="Password"
              style={styles.input}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              secureTextEntry
            />
            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
              placeholder="Confirm Password"
              style={styles.input}
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
              secureTextEntry
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

            <CommonButton onPress={handleSubmit} title={'Sign up'} />

            <Text onPress={() => navigation.goBack()} style={styles.linkText}>
              I already have an account
            </Text>
          </View>
        )}
      </Formik>
      <SelectLangModal
        visible={showModal}
        selectedLang={selectLanguage}
        onClose={() => {
          setShowModal(false);
        }}
        onSelect={lang => {
          setSelectLanguage(lang);
          setShowModal(false);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  wish: {
    color: 'black',
    fontSize: 40,
    fontWeight: '600',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 100,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    borderColor: '#ccc',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  linkText: {
    color: 'black',
    marginVertical: 20,
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: '600',
    textAlign: 'center',
  },
  langView: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    borderColor: '#9e9e9e',
    position: 'absolute',
    top: 30,
    right: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  lang: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  icon: {
    width: 16,
    height: 16,
    marginLeft: 10,
    tintColor: '#9e9e9e',
  },
});

export default Signup;
