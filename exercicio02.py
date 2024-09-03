def num_fibonacci(n):
    sequencia = [0, 1]
    # Adiciona um novo número à sequência, que é a soma do último
    while sequencia[-1] + sequencia[-2] <= n:
        sequencia.append(sequencia[-1] + sequencia[-2]) # [-1] último [-2] penúltimo
    return sequencia

def main():
    print("Digite um número qualquer")
    print("Para sair, digite 'sair'")
    while True:
        entrada = input("Digite um número: ")
        if entrada.lower() in ['sair']:
            break
        num = int(entrada)
        sequencia = num_fibonacci(num)
        if num in sequencia:
            print(f"O número {num} pertence à sequência de Fibonacci.")
        else:
            print(f"O número {num} não pertence à sequência de Fibonacci.")

main()