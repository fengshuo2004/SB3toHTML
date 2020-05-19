import tkinter as tk
from tkinter import filedialog

def browse():
    filename = filedialog.askopenfilename(filetypes=[('超文本标记语言文件', '*.html')])
    if (filename != ""): # if user DOESN'T just close dialog
        htmlField.delete(0, tk.END)
        htmlField.insert(0, filename)

def browseIcon():
    filename = filedialog.askopenfilename(filetypes=[('ICO图标文件', '*.ico')])
    if (filename != ""):  # if user DOESN'T just close dialog
        iconField.delete(0, tk.END)
        iconField.insert(0, filename)

# The window object
mainWindow = tk.Tk()
# Window bar title
mainWindow.title("继续打包至EXE...")
# Window size
mainWindow.geometry("500x300")
# Window icon
mainWindow.wm_iconbitmap('../build/icon.ico')
# Menu bar
menuBar = tk.Menu(mainWindow)
helpMenu = tk.Menu(menuBar, tearoff=0)
menuBar.add_cascade(label='帮助', menu=helpMenu)
helpMenu.add_command(label='命令行支持...')
# Window background color
mainWindow.configure(background="#49BE5C",menu=menuBar)
# Heading
tk.Label(mainWindow,
        text="Scratch 3 项目打包器",
        font=("",20,"bold"),
        bg="#49BE5C",
        fg="white").grid(row=0, columnspan=3, sticky=tk.W)

# Subheading
tk.Label(mainWindow,
        text="将SB3toHTML输出的文件进一步打包至Windows可执行文件 (EXE)",
        bg="#49BE5C",
        fg="white").grid(row=1, columnspan=3, sticky=tk.W)

# Seperator
tk.Label(mainWindow,
         text="自 >>>>>",
         bg="#49BE5C",
         fg="white",
         font=("",10,"bold")).grid(row=2, columnspan=3, sticky=tk.W)

# select html file row
tk.Label(mainWindow,
        text="HTML源文件路径: ",
        bg="#49BE5C",
        fg="white").grid(row=3, column=0)

htmlField = tk.Entry(mainWindow, width=36)
htmlField.grid(row=3,column=1,padx=5)

tk.Button(mainWindow,text="浏览", width=6, command=browse).grid(row=3,column=2)

# select icon file row
tk.Label(mainWindow,
         text="ICO图标文件路径: ",
         bg="#49BE5C",
         fg="white").grid(row=4, column=0)

iconField = tk.Entry(mainWindow, width=36)
iconField.grid(row=4, column=1, padx=5)
iconField.insert(tk.END, ".\\default.ico")

tk.Button(mainWindow, text="浏览", width=6, command=browseIcon).grid(row=4, column=2)

mainWindow.mainloop()
