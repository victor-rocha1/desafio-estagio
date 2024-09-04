function calcularFaturamento() {
    fetch('/dados/dados.json')
        .then(response => response.json())
        .then(faturamento => {

            // Filtrando apenas dias com faturamento
            const diasComFaturamento = faturamento.filter(dia => dia.valor > 0);

            // Encontrando o dia com maior e menor faturamento
            const menorValor = Math.min(...diasComFaturamento.map(dia => dia.valor));
            const maiorValor = Math.max(...diasComFaturamento.map(dia => dia.valor));

            // Cálculo da média faturada
            const somaFaturamento = diasComFaturamento.reduce((soma, dia) => soma + dia.valor, 0);
            const mediaMensal = somaFaturamento / diasComFaturamento.length;

            // Dias com faturamento acima da média
            const diasAcimaMedia = diasComFaturamento.filter(dia => dia.valor > mediaMensal).length;

            // Resultados Finais
            document.getElementById('resultado').innerHTML = `
                <p> <strong>Menor valor de faturamento:</strong> R$ ${menorValor.toFixed(2)} 📉</p>
                <p> <strong>Maior valor de faturamento:</strong> R$ ${maiorValor.toFixed(2)} 📈</p>
                <p> <strong>Dias com faturamento acima da média:</strong> ${diasAcimaMedia} dias 📊</p>
            `;
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

calcularFaturamento()