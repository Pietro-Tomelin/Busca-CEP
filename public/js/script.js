$(document).ready(function(){
    $("#cep").mask("99.999-999");
});

function buscaEndereco () {
    const elementoCampoCep = $('#cep');
    let cep = elementoCampoCep.val();

    cep = cep.replace(".", "")
        .replace("-", "");

    Swal.fire({
        title: 'Buscando endereço',
        didOpen: () => {
            Swal.showLoading()
        },
    });

    $.ajax({
        url: `https://viacep.com.br/ws/${cep}/json/`,
        context: document.body,
        success: prResult => {
            Swal.close();

            $('#bairro').val(prResult.bairro);
            $('#localidade').val(prResult.localidade);
            $('#uf').val(prResult.uf);
            $('#logradouro').val(prResult.logradouro);
            $('#complemento').val(prResult.complemento);
        },
        error: () => {
            Swal.close();

            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Não foi possível encontrar este endereço!',
            });

            elementoCampoCep.val('');
        }

    });
}