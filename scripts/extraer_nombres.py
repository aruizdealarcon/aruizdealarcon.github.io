import re

def extraer_nombres(html_texto):
    coincidencias = re.findall(r'name="(.*?)"', html_texto)

    vistos = set()
    milista = []
    for nombre in coincidencias:
        if nombre not in vistos:
            vistos.add(nombre)
            milista.append(nombre)

    resultado = "\n".join(f"\\nombre{{{nombre}}}" for nombre in milista)
    return resultado

html = '''
.........
'''

print(extraer_nombres(html))
