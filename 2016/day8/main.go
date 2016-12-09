package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"regexp"
	"strconv"
)

type Screen [][]bool

func main() {

	// open input
	f, err := os.Open("input.txt")
	if err != nil {
		panic(err)
	}

	// create screen
	screen := make(Screen, 50)
	for i := range screen {
		screen[i] = make([]bool, 6)
	}

	// loop through each line
	line := bufio.NewScanner(f)
	for line.Scan() {

		// run each scenario
		run("rect ([0-9]+)x([0-9]+)", line.Text(), screen.Rect)
		run("rotate row y=([0-9]+) by ([0-9]+)", line.Text(), screen.RotateRow)
		run("rotate column x=([0-9]+) by ([0-9]+)", line.Text(), screen.RotateColumn)

	}

	var count int
	var str string

	// count and display code
	for i := 0; i < 6; i++ {

		for j := 0; j < 50; j++ {

			if screen[j][i] {
				str += "|"
				count++
			} else {
				str += " "
			}
		}

		str += "\n"
	}

	fmt.Println(count)
	fmt.Println(str)
}

// run based on regex
func run(regex string, text string, f func(int, int)) {

	reg := regexp.MustCompile(regex)
	res := reg.FindStringSubmatch(text)
	if len(res) > 0 {
		x, _ := strconv.Atoi(res[1])
		y, _ := strconv.Atoi(res[2])
		f(x, y)
	}
}

func (s Screen) Rect(x int, y int) {

	for i := 0; i < x; i++ {

		s[i][0] = true

		for j := 0; j < y; j++ {

			s[i][j] = true
		}
	}
}

func (s Screen) RotateColumn(x int, count int) {

	floatCount := float64(count)
	col := float64(6)
	move := math.Mod(floatCount, col)

	newColumn := make([]bool, 6)

	//loop through all the rows
	for i := 0; i < 6; i++ {

		// move column x down by i
		if s[x][i] {

			s[x][i] = false

			if i+int(move) > 5 {
				newColumn[i-(6-int(move))] = true
			} else {
				newColumn[i+int(move)] = true
			}

		}
	}

	s[x] = newColumn
}

func (s Screen) RotateRow(y int, count int) {

	floatCount := float64(count)
	col := float64(50)
	move := math.Mod(floatCount, col)

	newRow := make([]bool, 50)

	//loop through all the rows
	for i := 0; i < 50; i++ {

		// move column x down by i
		if s[i][y] {

			s[i][y] = false

			if i+int(move) > 49 {
				newRow[i-(50-int(move))] = true
			} else {
				newRow[i+int(move)] = true
			}

		}
	}

	//loop through all the rows to add new row
	for i := 49; i >= 0; i-- {
		s[i][y] = newRow[i]
	}

}
