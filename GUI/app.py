#pip install eel
import eel
eel.init('GUI') #folder name
@eel.expose
def App(): #app main function
    print('Application running')

App()

eel.start('app.html',size=(500,600)) # run app window