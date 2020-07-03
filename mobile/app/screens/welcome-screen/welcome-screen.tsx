/* eslint-disable no-unused-expressions */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { FunctionComponent as Component, useEffect, useState } from "react"
import { View, TextInput, ViewStyle,Platform, ScrollView, KeyboardAvoidingView, TouchableOpacity, TextStyle, Modal, SafeAreaView, Alert } from "react-native"
import AsyncStorage from "@react-native-community/async-storage"
import { useNavigation } from "@react-navigation/native"
import { observer } from "mobx-react-lite"
import { Button, HeaderButton, Screen, Text, Wallpaper, Icon, CommonButton } from "../../components"
import { color, spacing } from "../../theme"
import { api } from '../../services/api'
import Spinner from 'react-native-loading-spinner-overlay'

const FULL: ViewStyle = { flex: 1 }
const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.black,
  paddingHorizontal: spacing[4],
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
}
const INPUT: TextStyle = {
  height: 45,
  fontFamily: 'Montserrat',
  width: 280,
  borderRadius: 8,
  borderWidth: 0.4,
  borderColor: color.palette.yellow,
  color: color.palette.yellow,
  textAlign: 'center',
  fontSize: 22,
  marginTop: 12,
  backgroundColor: color.transparentChick
}
const PASSWORD: TextStyle = {
  height: 45,
  fontFamily: 'Montserrat',
  width: '80%',
  borderRadius: 8,
  textAlign: 'center',
  fontSize: 22,
  color: color.palette.yellow
}
const PASS: ViewStyle = {
  width: 280,
  height: 45,
  flexDirection: 'row',
  borderRadius: 8,
  borderWidth: 0.4,
  borderColor: color.palette.yellow,
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 12,
  marginBottom: 20,
  backgroundColor: color.transparentChick
}
const SEPARATE: ViewStyle = {
  width: '10%',
  height: 45,
  alignItems: 'flex-start',
  justifyContent: 'center'
}
const FOOTER: ViewStyle = { backgroundColor: color.palette.black, height: '20%',alignItems: 'center' }
const FOOTER_CONTENT: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  padding: 5,
}
const CREDITOS: ViewStyle = {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
}
const POWERED: TextStyle = {
  fontSize: 12,
  color: color.palette.white,
}
const FOOTERMODAL: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: 60
}
const REGISTER: ViewStyle = {
  width: '50%',
  height: 40,
  borderRadius: 8,
  backgroundColor: color.palette.orangeDarker,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center'
}
const CENTEREDVIEW: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 2
}
const MODALVIEW: ViewStyle = {
  margin: 20,
  backgroundColor: color.palette.black,
  borderRadius: 10,
  borderWidth: 0.6,
  borderColor: color.palette.yellow,
  width: '85%',
  height: '70%',
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
}
const FORM: ViewStyle = {
  alignItems: "center",
  justifyContent: "center",
  width: '100%'
}
const PROP: TextStyle = {
  color: '#fff',
  fontSize: 18,
  marginLeft: 5,
  marginTop: 8,
  textAlign: 'center'
}
const BODY: ViewStyle = {
  flex: 4,
  alignItems: 'center',
  width: '100%'
}
const ALERTCENTERED: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  marginTop: 22
}
const ALERTTEXT: TextStyle = {
  marginBottom: 15,
  textAlign: "center",
  fontWeight: '600',
  fontSize: 20,
  color: color.palette.white
}
const ALERTVIEW: ViewStyle = {
  margin: 20,
  backgroundColor: color.palette.black,
  borderRadius: 20,
  borderWidth: 1,
  borderColor: color.palette.yellow,
  padding: 35,
  alignItems: "center",
  shadowColor: "#000",
  shadowOffset: {
    width: 0,
    height: 2
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5
}

export const WelcomeScreen: Component = observer(function WelcomeScreen() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(true)
  const [icon, setIcon] = useState('eyeoff')
  const [spinner, setSpinner] = useState(false)
  const [message, setMessage] = useState('')
  const navigation = useNavigation()
  const [confirmUserPassword, setConfirmUserPassword] = useState('')
  const [name, setName] = useState('')
  const [title, setTitle] = useState('')
  const [modalVisible, setModalVisible] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  useEffect(() => {
    navigate()
  }, [])

  async function navigate() {
    try {
      const user = await AsyncStorage.getItem('id')
      if (user != null) {
        // We have data!!
        navigation.navigate("demo")
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  async function handleSubmit() {
    try {
      setSpinner(true)
      const response = await api.post('/sessions', {
        email,
        password,
      })

      const id = response.data.id
      try {
        await AsyncStorage.setItem('id', id.toString())
      } catch (error) {
        Alert.alert(error)
        // Error saving data
      }
      try {
        await AsyncStorage.setItem('id', id.toString())
      } catch (error) {
        Alert.alert(error)
        setSpinner(false)
        // Error saving data
      }
      navigation.navigate("demo")
      setSpinner(false)
    } catch (err) {
      Alert.alert('Erro!!!', message)
      setMessage('No user found with this email/password')
      setSpinner(false)
    }
  }
  async function handleRegister(){
    if(password !== confirmUserPassword){
      setShowAlert(true)
      setMessage(`Oh Oh!!! As senhas não coincidem, por favor, revise-as e tente novamente`)
    }
    if (name == '') {
      setShowAlert(true)
      setMessage(`Por favor, preencha o campo de "Nome"para continuarmos`)
    } else if (title == '') {
      setShowAlert(true)
      setMessage(`Por favor, preencha o campo de "Título" para continuarmos`)
    } else if (password == '') {
      setShowAlert(true)
      setMessage(`Por favor, escolha uma senha para continuarmos com o registro`)
    } else if (email == '') {
      setShowAlert(true)
      setMessage(`Por favor, informe um email para continuarmos com o registro`)
    } else {
      try {
        const response = await api.post(`/users`, {
          name,
          title,
          email,
          password
        })

        setShowAlert(true)
        setModalVisible(false)
        setMessage(`Boas notícias!!! Seu cadastro foi finalizado!!! Faça login e aproveite o seu Guia Star Wars!!!`)
      } catch (error) {
        setShowAlert(true)
        setMessage(error)
      }
    }
  }

  function changeIcon() {
    setShowPassword(!showPassword)
    setIcon(icon === 'eye' ? 'eyeoff' : 'eye')
  }

  return (
    <View style={FULL}>
      <Spinner
        visible={spinner}
        textContent={'Loading...'}
        animation={'slide'}
        textStyle={{ color: '#FFF' }}
        overlayColor={'rgba(0,0,0,0.80)'}
      />
      <Screen style={CONTAINER} statusBar='light-content' barBackground={color.palette.black} preset="fixed" backgroundColor={color.transparent}>
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { setModalVisible(false) } } >
          <View style={CENTEREDVIEW}>
            <View style={MODALVIEW}>
              <View style={{ width: '100%', alignItems: 'flex-end', height: '10%', paddingHorizontal:5 }}>
                <HeaderButton name='close' onPress={()=>{setModalVisible(false)}}/>
              </View>
              <View style={BODY}>
                <SafeAreaView style={FORM}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <Text style={PROP}>Nome</Text>
                    <TextInput style={{...INPUT, width: '95%'}}
                      placeholder="Your Jedi Name"
                      value={name}
                      onChangeText={setName}
                    />

                    <Text style={PROP}>Título Jedi</Text>
                    <TextInput style={{...INPUT, width: '95%'}}
                      value={title}
                      placeholder="Ex. Jedi Master"
                      onChangeText={setTitle}
                    />
                    <Text style={PROP}>E-mail</Text>
                    <TextInput style={{...INPUT, width: '95%'}}
                      keyboardType='email-address'
                      placeholder="yourname@email.com"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />

                    <Text style={PROP}>Senha</Text>
                    <View style={{...PASS, width: '95%', marginBottom:0}}>
                      <View style={SEPARATE} />
                      <TextInput style={PASSWORD}
                        value={password}
                        autoCapitalize="none"
                        onChangeText={setPassword}
                        secureTextEntry={showPassword}
                      />
                      <TouchableOpacity style={SEPARATE} onPress={changeIcon}>
                        <Icon name={icon} style={{ height: 24, width: 24 }}/>
                      </TouchableOpacity>
                    </View>

                    <Text style={PROP}>Confirmar Senha</Text>
                    <View style={{...PASS, width: '95%'}}>
                      <View style={SEPARATE} />
                      <TextInput style={PASSWORD}
                        value={confirmUserPassword}
                        autoCapitalize="none"
                        onChangeText={setConfirmUserPassword}
                        secureTextEntry={showPassword}
                      />
                      <TouchableOpacity style={SEPARATE} onPress={changeIcon}>
                        <Icon name={icon} style={{ height: 24, width: 24 }}/>
                      </TouchableOpacity>
                    </View>
                    
                    <View style={FOOTERMODAL}>
                      <TouchableOpacity
                        style={REGISTER}
                        onPress={() => { handleRegister() }}
                      >
                        <Text style={{ color: '#fff', fontSize: 15 }}>Confirmar</Text>
                      </TouchableOpacity>
                    </View>
                  </ScrollView>
                </SafeAreaView>
              </View>
            </View>
          </View>
          {
            Platform.OS === 'ios' && <KeyboardAvoidingView behavior='padding'/>
          }
        </Modal>
        <Modal
            visible={showAlert}
            transparent={true}
            animationType={"fade"}
            onRequestClose={ () => { setShowAlert(false) } } >
              <View style={ALERTCENTERED}>
                <View style={ALERTVIEW}>
                  <Text style={ALERTTEXT}>{message}</Text>

                  <CommonButton
                    name="Ok!"
                    background={color.palette.orangeDarker}
                    onPress={() => {
                      setShowAlert(false)
                    }}
                  />
                </View>
              </View>
          </Modal>
        <Icon name='logo' style={{ height: 100, width: 200, backgroundColor: color.transparent }}/>
        <View style={SEPARATE} />
        <TextInput keyboardType="email-address" autoCapitalize="none" autoCompleteType="email" style={INPUT} placeholderTextColor={color.palette.yellow} multiline={false} value={email} onChangeText={setEmail} placeholder='Email' />
        <View style={PASS}>
          <View style={SEPARATE} />
          <TextInput style={PASSWORD} autoCapitalize="none" placeholderTextColor={color.palette.yellow} multiline={false} value={password} onChangeText={setPassword} placeholder='Senha' secureTextEntry={showPassword} />
          <TouchableOpacity style={SEPARATE} onPress={changeIcon}>
            <Icon name={icon} style={{ height: 24, width: 24 }}/>
          </TouchableOpacity>
        </View>
        <CommonButton name="Login" onPress={handleSubmit} background={color.palette.orangeDarker} preset="primary" />
        
      </Screen>
      <SafeAreaView style={FOOTER}>
        <View style={FOOTER_CONTENT}>
          <View style={CREDITOS}>
            <CommonButton name="Esqueci minha senha" textStyle={POWERED} style={{width:'auto'}} onPress={()=>{}} background={color.transparent} preset="primary" />
            <Text style={POWERED}>
              |
            </Text>
            <CommonButton name="Cadastre-se na ordem Jedi" textStyle={POWERED} style={{width:'auto'}} onPress={() => {setModalVisible(true)}} background={color.transparent} preset="primary" />
            
          </View>
          
        </View>
        <Text style={{...POWERED, color: color.whiteChick}}>
          Developed by Alexandre Nascimento
        </Text>
      </SafeAreaView>
    </View>
  )
})
