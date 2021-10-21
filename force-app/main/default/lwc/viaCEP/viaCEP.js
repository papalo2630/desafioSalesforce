import { LightningElement, track} from 'lwc';

// importing apex class to make callout
import getCurrencyData from '@salesforce/apex/IntegracaoViaCEP.getCEP';

export default class IntegracaoViaCEP extends LightningElement {
    @track Rua;
    @track Bairro;
    @track Cidade;
    @track Estado;
    @track CEP;

    limpa_formulário_cep() {
        //Limpa valores do formulário de cep.
         this.Rua ="";
         this.Bairro ="";
         this.Cidade ="";
         this.Estado ="";
    }
    limpa_formulário_cep(conteudo) {
    if (!("erro" in conteudo)) {
        //Atualiza os campos com os valores.
        this.Rua=(conteudo.logradouro);
        this.Bairro=(conteudo.bairro);
        this.Cidade=(conteudo.localidade);
        this.Estado=(conteudo.uf);
    } //end if.
    else {
        //CEP não Encontrado.
        limpa_formulário_cep();
        alert("CEP não encontrado.");
    }
}
    
     pesquisacep(valor) {

    //Nova variável "cep" somente com dígitos.
    var cep = valor.replace(/\D/g, '');

    //Verifica se campo cep possui valor informado.
    if (cep != "") {

        //Expressão regular para validar o CEP.
        var validacep = /^[0-9]{8}$/;

        //Valida o formato do CEP.
        if(validacep.test(cep)) {

            //Preenche os campos com "..." enquanto consulta webservice.
            this.Rua="...";
            this.Bairro="...";
            this.Cidade="...";
            this.Estado="...";

            //Cria um elemento javascript.
            var script = document.createElement('script');

            //Sincroniza com o callback.
            script.src = 'https://viacep.com.br/ws/'+ cep + '/json/?callback=meu_callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //cep é inválido.
            limpa_formulário_cep();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //cep sem valor, limpa formulário.
        limpa_formulário_cep();
    }
};