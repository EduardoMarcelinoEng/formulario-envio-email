let vue = new Vue({
    el: "#app",
    data: {
        error: {
            name: "*", email: "*", subject: "*", message: "*"
        },
        contact: {
            name: "",
            email: "",
            subject: "",
            message: ""
        },
        urlPost : "http://localhost/sistema de contato/app/contact.php",
        disabledButton : false,
        messageResult : ""
    },
    methods: {
        send : function(){
            if(this.validateForm()){
                this.disabledButton = true;
                this.messageResult = "Enviando mensagem. Por favor, aguarde!";
        
                var form = this.formData(this.contact);
                axios.post(this.urlPost, form).then(function(response){
                console.log(response.data);
                if(response.data == "send"){
                    vue.ResetForm();
                    vue.ResetError();
                    vue.messageResult  = "Mensagem enviada com sucesso!";
                    vue.disabledButton = false;
                }else{
                    vue.messageResult = "Não foi possível enviar sua mensagem. Tente novamente mais tarde.";
                }
                });
            }
        },
        formData : function(obj){
            var formData = new FormData();
            for(var key in obj){
                formData.append(key, obj[key]);
            }
            return formData;
        },
        validateForm: function(){
            let error = 0;
            this.resetError();
            
            if(this.contact.name.length < 4) {
                this.error.name = "Por favor, insira um nome válido (mínimo -> 4 caracteres)";
                error++;
            }

            if(this.contact.email.indexOf("@") < 0) {
                this.error.email = "E-mail inválido";
                error++;
            }

            if(this.contact.subject.length < 4) {
                this.error.subject = "Assunto inválido (mínimo -> 10 caracteres)";
                error++;
            }

            if(this.contact.message.length < 4) {
                this.error.message = "Mensagem inválida (mínimo -> 4 caracteres)";
                error++;
            }

            return (error === 0);
        },
        resetForm: function(){
            this.contact.name = "";
            this.contact.email = "";
            this.contact.subject = "";
            this.contact.message = "";
        },
        resetError: function(){
            this.error.name = "*";
            this.error.email = "*";
            this.error.subject = "*";
            this.error.message = "*";
        },
        toggleForm: function(show){
            if(show){
                $("#dvForm").show("slow");
                this.resetForm();
                this.resetError();
            }else{
                $("#dvForm").hide("slow");
            }
        }
    }
});