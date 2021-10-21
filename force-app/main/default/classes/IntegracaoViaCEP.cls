public class IntegracaoViaCEP {
    
    @AuraEnabled   
    public static List<ViaCEP> getCEP(List<String> cepsStr) { 
        List<ViaCEP> returnValue = new List<ViaCEP>();
        returnValue.add(sendRequest(cepsStr.get(0)));

        return returnValue;
    }

    public static ViaCEP sendRequest(String cep) {
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://viacep.com.br/ws/' + cep + '/json/');
        req.setMethod('GET');
        req.setHeader('Content-Type', 'application/json');
        req.setTimeout(120000);

        try {
            Http h = new Http();
            HttpResponse res = h.send(req);            
            if (res.getStatusCode() == 200) {
                return (ViaCEP) JSON.deserialize(res.getBody(), ViaCEP.class);
            }
        } catch (Exception e) {
            return null;
        }

        return null;
    }

    public class ViaCEP {
        @InvocableVariable
        public String cep;
        @InvocableVariable
        public String logradouro;
        @InvocableVariable
        public String complemento;
        @InvocableVariable
        public String bairro;
        @InvocableVariable
        public String localidade;
        @InvocableVariable
        public String uf;
        @InvocableVariable
        public String unidade;
        @InvocableVariable
        public String ibge;
        @InvocableVariable
        public String gia;
        @InvocableVariable
        public Boolean erro;
    }
}