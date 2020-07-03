const connection = require('../database/connection');

module.exports = {

  async create(request, response) {
    const { name, title, email, password } = request.body;

    const user  = await connection('users')
        .where('email', email)
        .select('name')
        .first();
    if(user){
      return response.status(400).json({error: 'This user already exists.'})
    }else{
    const [id] = await connection('users').insert({
      name,
      title,
      email,
      password
    })

    return response.json({name});
    }
  },

  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await await connection('users').count();
    const users = await connection('users')
      .limit(5)
      .offset((page - 1) * 5)
      .select([
        'users.*',
      ]);

    response.header('X-Total-Count', count['count(*)'])

  return response.json(users);
  },
  
  async especific(request, response) {
    const {id} = request.params;
    const user = await connection('users')
                      .where('id', id)
                      .select([
                        'users.*'
                      ])
                      .first()

  return response.json(user);
  },

  async edit(request, response) {
    const {id} = request.params
    const { name, title, email, password, image } = request.body;
    const edit = await connection('users')
                      .where('id', id)
                      .update({
                        name,
                        title,
                        email,
                        password,
                        image
                      })
  
  return response.json({name})
  }


}