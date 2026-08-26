const fs = require('node:fs')
const readline = require('node:readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
})

function showMenu() {

    fs.readFile('menu.txt', 'utf-8', (err, content) => {

        if (err) {
            console.log(err)
            console.log('Could not load menu.txt — closing.')
            rl.close()
            return
        }

        console.log(content)

        rl.question('Enter your choice: ', (choice) => {

            // 1. Create File
            if (choice === '1') {

                rl.question('Enter filename: ', (filename) => {

                    rl.question('Enter content: ', (content) => {

                        fs.writeFile(filename, content, (err) => {

                            if (err) {
                                console.log(err)
                            } else {
                                console.log('File created successfully.')
                            }

                            showMenu()
                        })

                    })

                })
            }

            // 2. Read File
            else if (choice === '2') {

                rl.question('Enter filename: ', (filename) => {

                    fs.readFile(filename, 'utf-8', (err, content) => {

                        if (err) {
                            console.log(err)
                        } else {
                            console.log('\nContent:')
                            console.log(content)
                        }

                        showMenu()
                    })

                })
            }

            // 3. Append File
            else if (choice === '3') {

                rl.question('Enter filename: ', (filename) => {

                    rl.question('Enter content: ', (content) => {

                        fs.appendFile(filename, '\n' + content, (err) => {

                            if (err) {
                                console.log(err)
                            } else {
                                console.log('Content added successfully.')
                            }

                            showMenu()
                        })

                    })

                })
            }

            // 4. Delete File
            else if (choice === '4') {

                rl.question('Enter filename: ', (filename) => {

                    fs.unlink(filename, (err) => {

                        if (err) {
                            console.log(err)
                        } else {
                            console.log('File deleted successfully.')
                        }

                        showMenu()
                    })

                })
            }

            // 5. List Files
            else if (choice === '5') {

                fs.readdir('.', (err, files) => {

                    if (err) {
                        console.log(err)
                    } else {
                        console.log('\nFiles:')
                        console.log(files)
                    }

                    showMenu()
                })
            }

            // 6. Rename File
            else if (choice === '6') {

                rl.question('Enter old filename: ', (oldFile) => {

                    rl.question('Enter new filename: ', (newFile) => {

                        fs.rename(oldFile, newFile, (err) => {

                            if (err) {
                                console.log(err)
                            } else {
                                console.log(
                                    'File renamed successfully:',
                                    newFile
                                )
                            }

                            showMenu()
                        })

                    })

                })
            }

            // 7. Exit
            else if (choice === '7') {

                console.log('Goodbye!')
                rl.close()

            }

            // Invalid choice
            else {

                console.log('Invalid choice. Please try again.')
                showMenu()

            }

        })

    })
}

showMenu()