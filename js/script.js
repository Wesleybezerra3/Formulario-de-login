class ValidarFormulario{
    constructor(){
    this.formulario = document.querySelector('.form');
    this.evento()
    }
    evento(){
        this.formulario.addEventListener('submit', e =>{
        this.handleSubmit(e)
        })
    }
    handleSubmit(e){
        e.preventDefault();
      const campos = this.camposValidados();
      const senha = this.senhasValidas();
      if(campos && senha){
        this.formulario.submit();
        alert('Cadastro enviado!')
      }
    }

    camposValidados(){
        let valid = true;

    for(let errorText of this.formulario.querySelectorAll('.error-text')){
        errorText.remove();
    }
        for(let campo of this.formulario.querySelectorAll('.validar')){
         if(!campo.value){
            this.creatError(campo,'Todos os campos devem está preenchidos!')
          valid = false

         }
         if(campo.classList.contains('email')){
            if(!this.verificarEmail(campo)){
                this.creatError(campo,'Email incorreto!')
                valid = false
            }
         }
         if(campo.classList.contains('cpf')){
            if(!this.validarCpf(campo)){
                this.creatError(campo,"CPF inválido!")
                valid = false;
            }
         }
        }
        return valid;
    }
    senhasValidas(){
        let valid = true;

        const senha = this.formulario.querySelector('.senha');
        const repetirSenha = this.formulario.querySelector('.repetirSenha');

        const padrao =/^[a-zA-Z0-9]{8,}$/;
        if(!padrao.test(senha.value)){
            valid = false;
            this.creatError(senha, 'A senha deve conter no mínimo 8 caracteres sendo uma maiúscula!');
        }
        if(senha.value !== repetirSenha.value){
            valid = false;
            this.creatError(senha, 'Repetir senha e senha precisam ser iguais!')
            this.creatError(repetirSenha, 'Repetir senha e senha precisam ser iguais!')
        }
        return valid;
    }

    validarCpf(campo){
    const cpf = new ValidaCPF(campo.value)
    if(!cpf.valida())  return false; 
      return true;
    }
    verificarEmail(campo){
        const padrao = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return padrao.test(campo.value)
    }

    creatError(campo, msg){
        const div = document.createElement('div');
        div.innerHTML = msg;
        div.classList.add('error-text');
        campo.insertAdjacentElement('afterend', div);
    }

}
const validar = new ValidarFormulario();


  
/^[a-zA-Z0-9]{8,}$/;


