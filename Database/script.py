import json




def process_airports(input_file, output_file):
    with open(input_file, 'r') as file:
        data = json.load(file)
        
    with open(output_file, 'w') as file:
        for airport_code, airport_info in data.items():
            if airport_info['iata'] and airport_info['city'] and airport_info['state'] and airport_info['country'] and (len(airport_info['iata']) == 3) and airport_info['country'] in ['CA', 'US', 'EG', 'FR', 'JP', 'UK']: 
                iata = airport_info['iata']
                city = airport_info['city'].replace("'", "\\'")
                state = airport_info['state'].replace("'", "\\'")
                country = airport_info['country'].replace("'", "\\'")
                file.write(f"('{iata}', '{city}', '{state}', '{country}'),\n")

if __name__ == "__main__":
    # Set to keep track of written IATA codes
    process_airports('airports.json', 'output.txt')

    
