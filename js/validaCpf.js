class ValidaCPF {
    constructor(cpf) {
      Object.defineProperty(this, "cpfFormatado", {
        enumerable: true,
        get: function () {
          return cpf.replace(/\D+/g, "");
        },
      });
    }
    validaCpf() {
      if (typeof this.cpfFormatado === "undefined") return false;
      if (this.cpfFormatado.length !== 11) return false;
      if (this.isSequencia()) return false;
  
      const cpfPacial = this.cpfFormatado.slice(0, -2);
      const digito1 = ValidaCPF.criarDigito(cpfPacial);
      const digito2 = ValidaCPF.criarDigito(cpfPacial + digito1);
  
      const novoCpf = cpfPacial + digito1 + digito2;
      return novoCpf === this.cpfFormatado;
    }
  
    static criarDigito(cpfPacial) {
      const cpfArray = Array.from(cpfPacial);
  
      let regresivo = cpfArray.length + 1;
      const total = cpfArray.reduce((ac, val) => {
        ac += regresivo * Number(val);
        regresivo--;
        return ac;
      }, 0);
      const digito = 11 - (total % 11);
      return digito > 10 ? "0" : String(digito);
    }
  
    isSequencia() {
      const sequencia = this.cpfFormatado[0].repeat(this.cpfFormatado.length);
      return sequencia === this.cpfFormatado;
    }
    valida() {
      if (this.validaCpf()) return true;
      return false;
    }
  }
 