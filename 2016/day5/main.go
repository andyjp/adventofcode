package main

import (
	"crypto/md5"
	"encoding/hex"
	"fmt"
	"strconv"
	"unicode/utf8"
)

func main() {

	const DOOR_ID = "abbhdwsy"

	//
	// ----- Part 1 -----
	//
	var pass string

	i := 0

	for utf8.RuneCountInString(pass) < 8 {

		hash := md5.Sum([]byte(DOOR_ID + strconv.Itoa(i)))

		hashString := hex.EncodeToString(hash[:])

		// if the md5 hash has 5 leading zeros
		if hashString[0:5] == "00000" {
			pass += hashString[5:6]
		}

		// increment
		i++
	}

	// print out the password
	fmt.Println(pass)

	//
	// ----- Part 2 -----
	//
	var passByte [8]byte

	j := 0

	for invalidPass(passByte) {

		// get hash
		hash := md5.Sum([]byte(DOOR_ID + strconv.Itoa(j)))

		// convert hash to string
		hashString := hex.EncodeToString(hash[:])

		// if we have 5 zeros
		if hashString[0:5] == "00000" {

			// convert 6th character to int to get the position number
			pos, err := strconv.Atoi(hashString[5:6])

			// if sixth character is between 0 and 7
			// and if we haven't set this one already (i.e. only set the character in the position once)
			if err == nil && pos < 8 && passByte[pos] == 0 {

				// put seventh character of the hash in position
				passByte[pos] = []byte(hashString[6:7])[0]
			}
		}

		// increment
		j++
	}

	// print out the password
	fmt.Println(string(passByte[:]))
}

// check to see if we have a valid pass
// valid pass doesn't have any bytes = 0
func invalidPass(passByte [8]byte) bool {

	for _, val := range passByte {
		if val == 0 {
			return true
		}
	}

	return false
}
