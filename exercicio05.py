def inverter_texto(texto):
    return texto[::-1]

texto = input("Digite um texto qualquer:\n")
texto_invertido = inverter_texto(texto)

print(f'Texto Invertido : {texto_invertido}')