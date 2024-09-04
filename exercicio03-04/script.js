function calcularFaturamento() {
    fetch('/dados/dados.json')
        .then(response => response.json())
        .then(dados => {
            const faturamentoDiario = dados.faturamentoDiario;
            const faturamentoEstados = dados.faturamentoEstados;

            // Filtrando apenas dias com faturamento
            const diasComFaturamento = faturamentoDiario.filter(dia => dia.valor > 0);

            // Encontrando o dia com maior e menor faturamento
            const menorValor = Math.min(...diasComFaturamento.map(dia => dia.valor));
            const maiorValor = Math.max(...diasComFaturamento.map(dia => dia.valor));

            // Cálculo da média faturada
            const somaFaturamento = diasComFaturamento.reduce((soma, dia) => soma + dia.valor, 0);
            const mediaMensal = somaFaturamento / diasComFaturamento.length;

            // Dias com faturamento acima da média
            const diasAcimaMedia = diasComFaturamento.filter(dia => dia.valor > mediaMensal).length;

            // Resultado
            document.getElementById('resultado').innerHTML = `
                <p><strong>Menor valor de faturamento:</strong> R$ ${menorValor.toFixed(2)} 📉</p>
                <p><strong>Maior valor de faturamento:</strong> R$ ${maiorValor.toFixed(2)} 📈</p>
                <p><strong>Dias com faturamento acima da média:</strong> ${diasAcimaMedia} dias 📊</p>
            `;

            document.getElementById('limpar-btn').style.display = 'inline-block';
            document.getElementById('faturamento-estado-card').style.display = 'block';

            percentualEstado(faturamentoEstados);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
}

function limpar() {
    document.getElementById('resultado').innerHTML = '';
    document.getElementById('faturamento-estado').innerHTML = '';
    document.getElementById('limpar-btn').style.display = 'none';
    document.getElementById('faturamento-estado-card').style.display = 'none';
}

function percentualEstado(faturamentoEstados) {
    const totalMensal = Object.values(faturamentoEstados).reduce((acc, valor) => acc + valor, 0);

    const faturamentoEstadoDiv = document.getElementById('faturamento-estado');
    faturamentoEstadoDiv.innerHTML = '';

    for (const estado in faturamentoEstados) {
        const percentual = (faturamentoEstados[estado] / totalMensal * 100).toFixed(2);
        const p = document.createElement('p');
        p.innerHTML = `<strong>${estado}:</strong> ${percentual}%`;
        faturamentoEstadoDiv.appendChild(p);
    }
}