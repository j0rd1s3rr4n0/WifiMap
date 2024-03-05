import sqlite3

def crear_tabla():
    conn = sqlite3.connect('wifis.db')
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS wifis
                 (id INTEGER PRIMARY KEY AUTOINCREMENT,
                 SSID TEXT,
                 wifi_password TEXT,
                 username TEXT,
                 password TEXT,
                 rango TEXT,
                 latitud REAL,
                 longitud REAL,
                 descripcion TEXT,
                 url TEXT)''')
    conn.commit()
    conn.close()

def anadir_wifi():
    ssid = input("Ingrese el SSID de la red Wi-Fi: ")
    wifi_password = input("Ingrese la contrase$a de la red Wi-Fi: ")
    username = input("Ingrese el nombre de usuario: ")
    password = input("Ingrese la contrase$a del usuario: ")
    rango = input("Ingrese el rango de la red Wi-Fi: ")
    latitud = float(input("Ingrese la latitud: "))
    longitud = float(input("Ingrese la longitud: "))
    descripcion = input("Ingrese una descripcion: ")
    url = input("Ingrese la URL relacionada (opcional): ")

    conn = sqlite3.connect('wifis.db')
    c = conn.cursor()
    c.execute('''INSERT INTO wifis (SSID, wifi_password, username, 
password, rango, latitud, longitud, descripcion, url)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)''',
              (ssid, wifi_password, username, password, rango, 
latitud, longitud, descripcion, url))
    conn.commit()
    conn.close()

def mostrar_menu():
    print("1. Anadir nueva red Wi-Fi")
    print("2. Salir")

def main():
    crear_tabla()
    while True:
        mostrar_menu()
        opcion = input("Seleccione una opcion: ")

        if opcion == '1':
            anadir_wifi()
            print("Red Wi-Fi anadida correctamente.")
        elif opcion == '2':
            print("Saliendo del programa...")
            break
        else:
            print("Opcion no v lida. Por favor, seleccione una opcion v lida.")

if __name__ == "__main__":
    main()

