document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('cadastroForm');
    const campos = ['nome', 'email', 'cep', 'endereco', 'bairro', 'cidade', 'estado', 'tamanho'];

    campos.forEach((campo) => {
        const valorSalvo = localStorage.getItem(campo);
        if (valorSalvo) {
            document.getElementById(campo).value = valorSalvo;
        }
    });
    campos.forEach((campo) => {
        document.getElementById(campo).addEventListener('input', (e) => {
            localStorage.setItem(campo, e.target.value);
        });
    });

    const cepInput = document.getElementById('cep');
    cepInput.addEventListener('blur', () => {
        const cep = cepInput.value.replace(/\D/g, '');

        if (cep.length === 8) {
            fetch(`https://viacep.com.br/ws/${cep}/json/`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.erro) {
                        alert('CEP não encontrado!');
                        return;
                    }

                    document.getElementById('endereco').value = data.logradouro || '';
                    document.getElementById('bairro').value = data.bairro || '';
                    document.getElementById('cidade').value = data.localidade || '';
                    document.getElementById('estado').value = data.uf || '';

                    localStorage.setItem('endereco', data.logradouro || '');
                    localStorage.setItem('bairro', data.bairro || '');
                    localStorage.setItem('cidade', data.localidade || '');
                    localStorage.setItem('estado', data.uf || '');
                })
                .catch(() => {
                    alert('Erro ao buscar o CEP. Tente novamente.');
                });
        }
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Cadastro realizado com sucesso!');
    });
});