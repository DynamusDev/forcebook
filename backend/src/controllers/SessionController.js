const nodemailer = require('nodemailer')
const connection = require('../database/connection');
const crypto = require('crypto');

const transport = nodemailer.createTransport({
  service: "Gmail",
  auth: {
      user: "starwarsdroide97@gmail.com",
      pass: "Amasi@198"
  }
});

module.exports = {
  async create(request, response) {
    const { email, password } = request.body;

    const user = await connection('users')
      .where('email', email)
      .where('password', password)
      .select('*')
      .first();

    if (!user) {
      return response.status(400).json({error: 'No user found with this email/password'})
    }

    return response.json(user);
  },

  async resetPassword(request, response) {
    const {token, password} = request.body;

    const userToken = await connection('users')
    .where('passwordResetToken', token)
    .first();

    if(!userToken){
      return response.status(400).send({error: 'Oh oh!, parece que este token não consta no nosso banco de dados, feche esta aba e tente novamente'})
    } else {
      const resetPassword = await connection('users')
                        .where('passwordResetToken', token)
                        .update({
                          password
                        });
      return response.status(200).send('Sucesso!!! Sua Senha foi alterada!!! Aproveite a sua jornada!!!')
    }
  },

  async forgotPassword(request, response) {
    const { email } = request.body;

    const user = await connection('users')
    .where('email', email)
    .first();

    if (!user){
      return response.status(400).send({error: 'Oh oh!, não encontramos nenhum usuário com esse email, por favor, verifique o email e ente novamente'})
    } else {
      const passwordResetToken = crypto.randomBytes(20).toString('hex');

      const passwordResetExpires = new Date();
      passwordResetExpires.setHours(passwordResetExpires.getHours() + 1);

      const resetToken = await connection('users')
                        .where('email', email)
                        .update({
                          passwordResetToken,
                          passwordResetExpires
                        });

      const emailASerEnviado = {
        from: 'starwarsdroide97@gmail.com',
        to: email,
        subject: 'Credencial de recuperação de senha ',
        text: `Você esqueceu a sua senha? Não tem problema, utilize esse token para redefinir a sua senha: ${passwordResetToken}`,
      };

      transport.sendMail(emailASerEnviado, 
        function(err){
          if(err) {
            console.log(err)
          }else{
            console.log('Email enviado com sucesso!!!');
          }
        }
        );
    }
  }
}