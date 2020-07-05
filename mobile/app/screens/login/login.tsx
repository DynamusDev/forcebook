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
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  margin: 0,
}
const INPUT: TextStyle = {
  height: 45,
  fontFamily: 'Montserrat',
  width: '70%',
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
  width: '80%',
  fontFamily: 'Montserrat',
  borderRadius: 8,
  textAlign: 'center',
  fontSize: 22,
  color: color.palette.yellow
}
const PASS: ViewStyle = {
  width: '70%',
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
}
const MODALVIEW: ViewStyle = {
  backgroundColor: color.palette.black,
  borderRadius: 10,
  borderWidth: 0.6,
  borderColor: color.palette.yellow,
  width: '80%',
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
  justifyContent: "center"
}
const PROP: TextStyle = {
  color: '#fff',
  fontSize: 18,
  marginLeft: 5,
  marginTop: 8,
  textAlign: 'center'
}
const BODY: ViewStyle = {
  flex: 1,
  alignItems: 'center',
  justifyContent: "center",
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

export const Login: Component = observer(function Login() {
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
  const [forgotPassword, setForgotPassword] = useState(false)
  const [tokenScreen, setTokenScreen] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [emailResetPassword, setEmailResetPassword] = useState('')
  const [token, setToken] = useState('')

  useEffect(() => {
    navigate()
  }, [])

  async function navigate() {
    try {
      const user = await AsyncStorage.getItem('id')
      if (user != null) {
        // We have data!!
        navigation.navigate("mytabs")
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
        setSpinner(false)
        // Error saving data
      }
      navigation.navigate("mytabs")
      setSpinner(false)
    } catch (error) {
      setShowAlert(true)
      setMessage(`Oh Oh!!! Nenhum usuário encontrado com esse email/senha... Por favor, verifique as informações e tente novamente!!!`)
      setSpinner(false)
    }
  }
  async function handleRegister(){
    if(password !== confirmUserPassword){
      setShowAlert(true)
      setMessage(`Oh Oh!!! As senhas não coincidem, por favor, revise-as e tente novamente`)
    } else if (name == '') {
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
      setSpinner(true)
      try {
        const response = await api.post(`/users`, {
          name,
          title,
          email,
          password
        })
        setSpinner(false)
        setShowAlert(true)
        setModalVisible(false)
        setMessage(`Boas notícias!!! Seu cadastro foi finalizado!!! Faça login e aproveite o seu Guia Star Wars!!!`)
      } catch (err) {
        setShowAlert(true)
        setMessage(err)
      }
    }
  }

  async function handleForgotPassword(){
    if(emailResetPassword === ''){
      setShowAlert(true)
      setMessage(`Oh Oh!!! Precisamos do seu email para lhe enviarmos o token para recuperação de senha`)
    }else{
      setNewPassword('')
      setToken('')
      setForgotPassword(false)
      setTokenScreen(true)
      const email = emailResetPassword
      try {
        const response = await api.put(`/sessions`, {
          email
        })
        
      } catch (err) {
        setShowAlert(true)
        setMessage("Oh oh!, não encontramos nenhum usuário com esse email, por favor, verifique o email e tente novamente")
        setTokenScreen(false)
      }
    }
  }

  async function handleChangePassword(){
    if(newPassword === ''){
      setShowAlert(true)
      setMessage(`Oh Oh!!! Informe uma nova senha para continuarmos`)
    }else if(token === ''){
      setShowAlert(true)
      setMessage(`Oh Oh!!! Informe o token que lhe enviamos por email para continuarmos`)
    } else {
      setSpinner(true)
      const password = newPassword
      try {
        const response = await api.post(`/reset_password`, {
          token,
          password
        })
        setSpinner(false)
        setShowAlert(true)
        setTokenScreen(false)
        setMessage(`Sucesso!!! Sua senha foi alterada!!! Faça login e aproveite a sua jornada!!!`)
      } catch (err) {
        console.log(err)
        setSpinner(false)
        setShowAlert(true)
        setMessage("Oh oh!, parece que este token não consta no nosso banco de dados, verifique o token e tente novamente")
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
                <HeaderButton name='close' onPress={()=>{setModalVisible(false); setTokenScreen(false); setForgotPassword(false)}}/>
              </View>
              <View style={BODY}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <Text style={PROP}>Nome</Text>
                    <TextInput style={{...INPUT, width: 250}}
                      placeholder="Your Jedi Name"
                      value={name}
                      onChangeText={setName}
                    />

                    <Text style={PROP}>Título Jedi</Text>
                    <TextInput style={{...INPUT, width: 250}}
                      value={title}
                      placeholder="Ex. Jedi Master"
                      onChangeText={setTitle}
                    />
                    <Text style={PROP}>Email</Text>
                    <TextInput style={{...INPUT, width: 250}}
                      keyboardType='email-address'
                      placeholder="yourname@email.com"
                      autoCapitalize="none"
                      value={email}
                      onChangeText={setEmail}
                    />

                    <Text style={PROP}>Senha</Text>
                    <View style={{...PASS, marginBottom:0, width: 250}}>
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
                    <View style={{...PASS, marginBottom:0, width: 250}}>
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
              </View>
            </View>
          </View>
          {
            Platform.OS === 'ios' && <KeyboardAvoidingView behavior='padding'/>
          }
        </Modal>
        <Modal
          visible={tokenScreen}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { setModalVisible(false) } } >
          <View style={CENTEREDVIEW}>
            <View style={{...MODALVIEW, height: '60%', alignItems: 'center'}}>
              <View style={{ width: '100%', alignItems: 'flex-end', height: '20%', paddingHorizontal:5 }}>
                <HeaderButton name='close' onPress={()=>{setTokenScreen(false)}}/>
              </View>
              <View style={BODY}>
                <ScrollView contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                  <Text style={PROP}>Informe o token que te foi enviado Email</Text>
                  <TextInput style={{...INPUT, width: 250, marginBottom: 20}}
                    autoCapitalize="none"
                    placeholderTextColor={color.palette.yellow}
                    placeholder='Token'
                    value={token}
                    onChangeText={setToken}
                  />

                  <Text style={PROP}>Informe a nova senha</Text>
                  <View style={{...PASS, width: 250}}>
                    <View style={SEPARATE} />
                    <TextInput style={PASSWORD}
                      autoCapitalize="none"
                      placeholderTextColor={color.palette.yellow}
                      multiline={false}
                      value={newPassword}
                      onChangeText={setNewPassword}
                      placeholder='Nova Senha'
                      secureTextEntry={showPassword} />
                    <TouchableOpacity style={SEPARATE} onPress={changeIcon}>
                      <Icon name={icon} style={{ height: 24, width: 24 }}/>
                    </TouchableOpacity>
                  </View>
                  <View style={FOOTERMODAL}>
                    <CommonButton name="Alterar Senha" onPress={()=>{handleChangePassword()}} background={color.palette.orangeDarker} preset="primary" />
                  </View>
                </ScrollView>
              </View>
            </View>
          </View>
          {
            Platform.OS === 'ios' && <KeyboardAvoidingView behavior='padding'/>
          }
        </Modal>
        <Modal
          visible={forgotPassword}
          transparent={true}
          animationType={"fade"}
          onRequestClose={ () => { setModalVisible(false) } } >
          <View style={CENTEREDVIEW}>
            <View style={{...MODALVIEW, height: '40%'}}>
              <View style={{ width: '100%', alignItems: 'flex-end', height: '20%', paddingHorizontal:5 }}>
                <HeaderButton name='close' onPress={()=>{setForgotPassword(false)}}/>
              </View>
              <View style={BODY}>
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                  >
                    <Text style={PROP}>Informe seu Email</Text>
                    <TextInput style={{...INPUT, marginBottom: 20, width: 250}}
                      keyboardType='email-address'
                      placeholder="yourname@email.com"
                      autoCapitalize="none"
                      value={emailResetPassword}
                      onChangeText={setEmailResetPassword}
                    />
                    <View style={FOOTERMODAL}>
                      <CommonButton name="Enviar email" onPress={()=>{handleForgotPassword()}} background={color.palette.orangeDarker} preset="primary" />
                    </View>
                  </ScrollView>
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
            <CommonButton name="Esqueci minha senha" textStyle={POWERED} style={{width:'auto'}} onPress={()=>{setForgotPassword(true), setEmailResetPassword('')}} background={color.transparent} preset="primary" />
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
