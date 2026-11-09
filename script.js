// Arrays utilizados para armazenar os dados do sistema.
const nomesProdutos = [];
const precosProdutos = [];
const totaisVendas = [];

// Formata valores no padrão monetário brasileiro.
function formatarMoeda(valor) {
    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });
}

// Função sem parâmetros e sem retorno.
function cadastrarProduto() {
    let nome = prompt("Digite o nome do produto:");

    if (nome === null) {
        return;
    }

    nome = nome.trim();

    if (nome === "") {
        alert("O nome do produto não pode ficar vazio.");
        return;
    }

    // Não permite cadastrar produtos com nomes repetidos.
    for (let i = 0; i < nomesProdutos.length; i++) {
        if (nomesProdutos[i].toLowerCase() === nome.toLowerCase()) {
            alert("Já existe um produto cadastrado com esse nome.");
            return;
        }
    }

    let entradaPreco = prompt("Digite o preço do produto:");

    if (entradaPreco === null) {
        return;
    }

    // Aceita tanto vírgula quanto ponto como separador decimal.
    entradaPreco = entradaPreco.trim().replace(",", ".");
    const preco = Number(entradaPreco);

    if (entradaPreco === "" || !Number.isFinite(preco) || preco <= 0) {
        alert("Preço inválido! O preço deve ser maior que zero.");
        return;
    }

    nomesProdutos.push(nome);
    precosProdutos.push(preco);

    alert("Produto cadastrado com sucesso!");
}

// Função sem parâmetros e sem retorno.
function listarProdutos() {
    if (nomesProdutos.length === 0) {
        alert("Não existem produtos cadastrados.");
        return;
    }

    let mensagem = "PRODUTOS CADASTRADOS\n\n";

    for (let i = 0; i < nomesProdutos.length; i++) {
        mensagem += "Código: " + (i + 1) + "\n";
        mensagem += "Produto: " + nomesProdutos[i] + "\n";
        mensagem += "Preço: " + formatarMoeda(precosProdutos[i]) + "\n";
        mensagem += "--------------------------\n";
    }

    alert(mensagem);
}

// Função com parâmetros e com retorno.
function calcularTotalVenda(preco, quantidade) {
    return preco * quantidade;
}

// Função com parâmetros e com retorno.
function calcularDesconto(total) {
    if (total > 50) {
        return total * 0.10;
    }

    return 0;
}

// Função com parâmetros e sem retorno.
function exibirResumoVenda(nome, preco, quantidade, subtotal, desconto) {
    const valorFinal = subtotal - desconto;

    let mensagem = "RESUMO DA VENDA\n\n";
    mensagem += "Produto: " + nome + "\n";
    mensagem += "Preço unitário: " + formatarMoeda(preco) + "\n";
    mensagem += "Quantidade: " + quantidade + "\n";
    mensagem += "Subtotal: " + formatarMoeda(subtotal) + "\n";
    mensagem += "Desconto: " + formatarMoeda(desconto) + "\n";
    mensagem += "Valor final: " + formatarMoeda(valorFinal);

    alert(mensagem);
}

// Processo de realização de uma venda.
function realizarVenda() {
    if (nomesProdutos.length === 0) {
        alert("Cadastre pelo menos um produto antes de realizar uma venda.");
        return;
    }

    listarProdutos();

    let codigo = prompt("Digite o código do produto desejado:");

    if (codigo === null) {
        return;
    }

    codigo = Number(codigo);

    if (!Number.isInteger(codigo) || codigo < 1 || codigo > nomesProdutos.length) {
        alert("Código de produto inválido.");
        return;
    }

    const indice = codigo - 1;
    const nome = nomesProdutos[indice];
    const preco = precosProdutos[indice];

    let entradaQuantidade = prompt("Digite a quantidade desejada:");

    if (entradaQuantidade === null) {
        return;
    }

    const quantidade = Number(entradaQuantidade);

    if (!Number.isInteger(quantidade) || quantidade <= 0) {
        alert("Quantidade inválida! Digite um número inteiro maior que zero.");
        return;
    }

    const subtotal = calcularTotalVenda(preco, quantidade);
    const desconto = calcularDesconto(subtotal);
    const valorFinal = subtotal - desconto;

    exibirResumoVenda(nome, preco, quantidade, subtotal, desconto);

    // A venda só é registrada se o usuário confirmar.
    const confirmar = confirm(
        "Deseja confirmar esta venda no valor de " + formatarMoeda(valorFinal) + "?"
    );

    if (confirmar) {
        totaisVendas.push(valorFinal);
        alert("Venda registrada com sucesso!");
    } else {
        alert("Venda cancelada. Nenhum valor foi registrado.");
    }
}

// Função sem parâmetros e com retorno.
function obterTotalVendasDia() {
    let total = 0;

    for (let i = 0; i < totaisVendas.length; i++) {
        total += totaisVendas[i];
    }

    return total;
}

// Função sem parâmetros e sem retorno.
function exibirTotalVendasDia() {
    if (totaisVendas.length === 0) {
        alert("Não existem vendas registradas.");
        return;
    }

    const total = obterTotalVendasDia();

    let mensagem = "TOTAL DE VENDAS DO DIA\n\n";
    mensagem += "Quantidade de vendas: " + totaisVendas.length + "\n";
    mensagem += "Valor total vendido: " + formatarMoeda(total);

    alert(mensagem);
}

// Função sem parâmetros e com retorno.
function exibirMenu() {
    return prompt(
        "SISTEMA DE LANCHONETE\n\n" +
        "1 - Cadastrar produto\n" +
        "2 - Listar produtos cadastrados\n" +
        "3 - Realizar venda\n" +
        "4 - Consultar total de vendas do dia\n" +
        "5 - Encerrar o sistema\n\n" +
        "Digite a opção desejada:"
    );
}

// Controla a execução do menu principal.
function executarSistema() {
    let opcao;

    do {
        opcao = exibirMenu();

        if (opcao === null) {
            break;
        }

        switch (opcao.trim()) {
            case "1":
                cadastrarProduto();
                break;

            case "2":
                listarProdutos();
                break;

            case "3":
                realizarVenda();
                break;

            case "4":
                exibirTotalVendasDia();
                break;

            case "5":
                alert("Sistema encerrado. Obrigado!");
                break;

            default:
                alert("Opção inválida! Escolha uma opção de 1 a 5.");
        }
    } while (opcao.trim() !== "5");

}

// Inicia o sistema quando o usuário clicar no botão.
document.getElementById("iniciarSistema").addEventListener("click", executarSistema);
