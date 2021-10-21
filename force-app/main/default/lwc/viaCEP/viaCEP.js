async function validarCepNaApi(cep) {
    const resposta = await fetch(
      `https://viacep.com.br/ws/${cep}/json/?callback=`
    );
    const dados = await resposta.json();
    return dados;
  }
  
  async function pegarCep() {
    let cep = document.querySelector("#cep").value;
  
    cep = cep.replace(/\D/g, "");
  
    console.log("cep: ", cep);
  
    if (cep != "") {
      console.log("cep com valor");
      let validaCep = /^[0-9]{8}$/;
      if (validaCep.test(cep)) {
        console.log("cep validado com sucesso");
        const valoresDosCampos = await validarCepNaApi(cep);
        console.log(valoresDosCampos);
        if (!("erro" in valoresDosCampos)) {
          document.querySelector("#rua").value = valoresDosCampos.logradouro;
          document.querySelector("#bairro").value = valoresDosCampos.bairro;
          document.querySelector("#cidade").value = valoresDosCampos.localidade;
          document.querySelector("#estado").value = valoresDosCampos.uf;
        } else {
          console.log("cep em formato errado");
          limparFormularioCep();
          alert("CEP não encontrado.");
        }
      }
    } else {
      console.log("cep sem valor, por favor o preencha");
      limparFormularioCep();
    }
  }
  
  function limparFormularioCep() {
    document.querySelector("#cep").value = "";
    document.querySelector("#rua").value = "";
    document.querySelector("#bairro").value = "";
    document.querySelector("#cidade").value = "";
    document.querySelector("#estado").value = "";
  }
  
  function inserirEndereco() {
    const cep = document.querySelector("#cep").value;
    const rua = document.querySelector("#rua").value;
    const bairro = document.querySelector("#bairro").value;
    const cidade = document.querySelector("#cidade").value;
    const estado = document.querySelector("#estado").value;
  
    const enderecoDeEntrega = {
      cep,
      rua,
      bairro,
      cidade,
      estado,
    };
    console.log(enderecoDeEntrega);
  
    return enderecoDeEntrega;
  }