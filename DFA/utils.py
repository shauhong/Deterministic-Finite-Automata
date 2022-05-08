import pickle
import yaml

def load_text(path):
    with open(path) as f:
        text = f.read()
        return text
    
def load_pickle(path):
    with open(path, 'rb') as f:
        data = pickle.load(f)
        return data
    
def save_pickle(data, path):
    with open(path, 'wb') as f:
        pickle.dump(data, f)
        
def load_yaml(path):
    with open(path) as f:
        data = yaml.load(f, Loader=yaml.FullLoader)
        return data
        
def save_yaml(data, path):
    with open(path, 'w') as f:
        yaml.dump(data, f)