package main

import (
	"bufio"
	"fmt"
	"os"
	"strings"
)

func main() {

	// open input
	f, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}

	// initialize map for saving letters map[COLUMN]map[LETTER]COUNT
	colChars := make(map[int]map[string]int)

	// initialize []byte to hold message
	message := make([]byte, 8)

	// loop through each line
	line := bufio.NewScanner(f)
	for line.Scan() {

		// initialize column number
		var col int

		// loop through each character on each line
		characters := bufio.NewScanner(strings.NewReader(line.Text()))
		characters.Split(bufio.ScanRunes)
		for characters.Scan() {

			letter := characters.Text()

			// if the column key isn't created, create it
			if colChars[col] == nil {
				colChars[col] = make(map[string]int)
			}

			// increment letter count
			colChars[col][letter]++

			// add to message if letter has highest count
			if colChars[col][letter] > colChars[col][string(message[col])] {
				message[col] = []byte(letter)[0]
			}

			// increment col
			col++
		}
	}

	fmt.Println("Part 1 message:", string(message))

	// loop through to get lowest count for part 2 message
	for column, letters := range colChars {

		var lowest string

		for letter, count := range letters {

			if lowest == "" {
				lowest = letter
			}

			if count < letters[lowest] {
				lowest = letter
			}

		}
		message[column] = []byte(lowest)[0]
	}

	fmt.Println("Part 2 message:", string(message))
}
