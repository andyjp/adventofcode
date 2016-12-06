package main

import (
	"bufio"
	"fmt"
	"math"
	"os"
	"strconv"
	"strings"
)

func main() {

	f, err := os.Open("input.txt")

	if err != nil {
		panic(err)
	}

	//validTri := 0

	//// loop through each line
	//line := bufio.NewScanner(f)
	//for line.Scan() {
	//
	//	// initiate sides and count variables to create a slice of sides
	//	sides := make([]string, 3)
	//	count := 0
	//
	//	// loop through each word on each line
	//	words := bufio.NewScanner(strings.NewReader(line.Text()))
	//	words.Split(bufio.ScanWords)
	//	for words.Scan() {
	//
	//		sides[count] = words.Text()
	//		count++
	//	}
	//
	//	if isValidTri(sides) {
	//		validTri++
	//	}
	//}

	triangles := make([][]string, 1)
	triangles[0] = make([]string, 3)

	var lineNumber, colLength float64
	lineNumber = 0
	colLength = 3

	var col, triIndex, pos int

	// loop through each line
	line := bufio.NewScanner(f)
	for line.Scan() {

		// loop through each word on each line
		words := bufio.NewScanner(strings.NewReader(line.Text()))
		words.Split(bufio.ScanWords)
		col = 0
		for words.Scan() {

			// reset col number
			if col == 3 {
				col = 0
			}

			// position
			pos = int(math.Mod(lineNumber, colLength))

			triIndex = int(math.Floor(lineNumber/colLength)*colLength) + col

			if int(triIndex) == len(triangles)-1 {
				triangles = append(triangles, make([]string, 3))
			}

			triangles[triIndex][pos] = words.Text()

			col++

		}

		lineNumber++

	}

	fmt.Println(triangles)

	validTri := 0
	// check how many triangles valid
	for _, t := range triangles {
		if t[0] != "" && isValidTri(t) {
			validTri++
		}
	}

	fmt.Println(validTri)

}

// converts string slice to int slice and returns if sides in slice make valid triangle
func isValidTri(sides []string) bool {

	s := make([]int, 3)

	for i, side := range sides {

		var err error
		s[i], err = strconv.Atoi(side)
		if err != nil {
			panic(err)
		}

	}

	return s[0]+s[1] > s[2] && s[0]+s[2] > s[1] && s[1]+s[2] > s[0]

}
