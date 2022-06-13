---
authors: sanderp
date: "2021-01-19T10:00"
aliases:
  - /advent-of-code-2020
description: They promised me fun and profit when using F#. I have to say, they were right.
tags:
  - "Functional Programming"
  - "Advent of Code"
title: "Advent of Code 2020: Having fun with F#"
---

The last month of each year is always a special one. As some might be familiar with the concept of an [advent calendar](https://en.wikipedia.org/wiki/Advent_calendar), there is a special competition starting each year on December 1st: [Advent of Code](https://adventofcode.com/). Counting down each day until Christmas, you are sent off on an adventure that requires you to solve a series of puzzles. Each day a new challenge is unlocked, and each challenge consists of two parts. Solving a challenge successfully yields you _gold stars_, and obtaining the total of 50 gold stars usually means you have saved Christmas.

Each event also comes with its own _leaderboard_: You score points based on the time it takes you to complete a challenge. Ending up on this leaderboard is notoriously hard though: only the top 100 receives any points at all. However, for many of us (including myself), being able to complete all puzzles as they unlock is enough of a challenge. It's a good way to brush up on your problem solving skills, knowledge of algorithms, or just to practice coding in a new programming language.

## Falling in love with F#

Advent of Code 2020 was the second time I actively participated (using previous years for practicing purposes) and after using Go the year before I wanted to try something different this time.

In the previous years I have encountered several people - shout out to [Devon Burriss](https://devonburriss.me/) - who were praising F# for its ability to correctly model domains and allow you to build type-safe and correct programs in a functional and concise manner. Inspired by their enthousiasm and plenty of online advocates for F# I decided it was time to put my functional programming skills to the test and do this year in F#.

It didn't take long for the benefits to start to show: the first thing I fell in love with was the ability to use [discriminated unions](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/discriminated-unions) to model the puzzle input. Representing your domain model in a strict type system is a great way to reduce complexity in your code, because it makes it impossible to reach invalid states and reduces the amount of [defensive programming](https://enterprisecraftsmanship.com/posts/defensive-programming/) needed.

Secondly, having used functional programming concepts in other programming languages for years I couldn't help but notice that, instead of being bolted on using libraries (like `LanguageExtensions` for C# and `Vavr` for Java), F# immediately felt _right_. The syntax is very concise and the ability to "pipe" variables into a function makes a set of function applications much more readable compared to other languages. Consider the following Java code compared to the F# equivalent:

```java
public String transform(String input) {
  return validate(stripLeadingZeroes(toTitleCase(input)));
}
```

```fsharp
let transform input =
  input |> toTitleCase |> stripLeadingZeroes |> validate
```

The biggest difference in my opinion is that the F# example reads left-to-right, whereas the Java example needs to be read right-to-left. This can of course be solved by using local variables, but that clutters it even further.

Finally, I am a big fan of self-documenting code, and over the years I have come to realize that this is much easier to achieve if the signal-to-noise ratio is as high as possible. By combining functional programming and F# I feel like there is almost no need to write _how_ something needs to be done, just _what_ has to be done. That, in my opinion is the way to code for today, while being able to come back to it in the future.

## Solving programming challenges in F#

Here is an example to illustrate the power of F# when doing programming challenges.

Suppose you are given a list of instructions that either tell you to:

- Advance a number of steps: the instruction `A10` means advance `10` steps, `A2` means advance `2` steps, etc.
- Rotate by a number of degrees clockwise: the instruction `R90` means rotate `90` degrees clockwise, `R270` means rotate `270` degrees clockwise, etc.
- Rotate by a number of degrees counter-clockwise: the instruction `L90` means rotate `90` degrees counter-clockwise, `L270` means rotate `270` degrees counter-clockwise, etc.

For this example, assume that each rotation is always a multiple of 90 degrees. So, given a list of instructions and a starting position, you are asked to find out what the final position would be if all instructions were to be followed from top to bottom. Here is an example list of instructions:

    R180
    A10
    L90
    A3

### Using the type system

Of course you can write a program that works with the raw instructions directly, but I challenge you to think about the domain of the problem. For starters, looking at the instructions we can already think of two things:

1. Advancing by `n` steps means that we have to keep track of a position
2. Rotating means that we have to keep track of a direction

So, let's start there:

```fsharp
type Position = int * int

type Direction = North | East | South | West
```

Next up, we have the instructions themselves. Discriminated unions here are a great way to model which types of instructions your program can handle, so let's do that! We could define a type that is very close to the original description, like so:

```fsharp
type Instruction =
  | Advance of steps:int
  | RotateRight of degrees:int
  | RotateLeft of degrees:int
```

But, remember that we could assume that rotations are always multiples of 90 degrees? Defining our type this way means that the business logic of our solution has to "know" this, and handle inputs such as `RotateRight(11)` as invalid. However, if we build that assumption into our design, we can simplify the business logic greatly, resulting in less room for nasty bugs.

```fsharp
type Instruction =
  /// Advance one step in the current direction
  | Advance
  /// Rotate 90 degrees clockwise
  | RotateRight
  /// Rotate 90 degrees counter-clockwise
  | RotateLeft
```

### Writing the business logic

Now that we have modeled the domain of our challenge using the type system, we can think about how we can write the business logic for our challenge. First, we can come up with functions that allow us to follow either one of the instructions:

```fsharp
/// Calculate the position when advancing one step in the given direction from the given position
let advance (direction: Direction) (position: Position): Position =
  let x, y = position
  match direction with
  | North -> (x, y + 1)
  | East -> (x + 1, y)
  | South -> (x, y - 1)
  | West -> (x - 1, y)

/// Calculate the new direction when rotating right from the given direction
let rotateRight (direction: Direction): Direction =
  match direction with
  | North -> East
  | East -> South
  | South -> West
  | West -> North

/// Calculate the new direction when rotating left from the given direction
let rotateLeft (direction: Direction): Direction =
  match direction with
  | North -> West
  | East -> North
  | South -> East
  | West -> South
```

No rocket science there, right? Now that we have these functions to follow a single instruction, all we need is a way to combine them. To do so, we can think about our problem like a state machine: given a current state and an instruction, perform an operation to obtain a new state.

First, let's define a type for our state, which consists of the current position and direction:

```fsharp
type State = { Position: Position; Direction: Direction }
```

Then, we can come up with our state machine function:

```fsharp
let applyInstruction (currentState: State) (instruction: Instruction): State =
  match instruction with
  /// When advancing, the new state consists of a new position, while the direction remains unchanged
  | Advance -> { currentState with Position = advance currentState.Direction currentState.Position }

  /// When rotating, the new state consists of a new direction, while the position remains unchanged
  | RotateRight -> { currentState with Direction = rotateRight currentState.Direction }
  | RotateLeft -> { currentState with Direction = rotateLeft currentState.Direction }
```

Again, this function is really straight-forward. The type system helps us to express the intent of each function clearly, and the way we modeled the domain means we can focus on one thing only, without having to think about input validation or other edge cases.

The only thing left to complete our business logic is a function that calculates the final state after following all instructions. This is where F# (and functional programming in general) really shines, because we can use a built-in function for it!

```fsharp
let initialState = { Position = (0, 0); Direction = North }
let finalState = Seq.fold applyInstruction initialState instructions
```

### Completing the solution

With the types and the business logic complete, we can wrap up our solution. All we need is some plumbing code to parse the instructions and output the answer. For reference, here is the full solution:

```fsharp
open System.IO

type Position = int * int

type Direction = North | East | South | West

type Instruction =
  /// Advance one step in the current direction
  | Advance
  /// Rotate 90 degrees clockwise
  | RotateRight
  /// Rotate 90 degrees counter-clockwise
  | RotateLeft

type State = { Position: Position; Direction: Direction }

/// Calculate the position when advancing one step in the given direction from the given position
let advance (direction: Direction) (position: Position): Position =
  let x, y = position
  match direction with
  | North -> (x, y + 1)
  | East -> (x + 1, y)
  | South -> (x, y - 1)
  | West -> (x - 1, y)

/// Calculate the new direction when rotating right from the given direction
let rotateRight (direction: Direction): Direction =
  match direction with
  | North -> East
  | East -> South
  | South -> West
  | West -> North

/// Calculate the new direction when rotating left from the given direction
let rotateLeft (direction: Direction): Direction =
  match direction with
  | North -> West
  | East -> North
  | South -> East
  | West -> South

/// Calculate a new state by applying the given instruction to the current state
let applyInstruction (currentState: State) (instruction: Instruction): State =
  match instruction with
  // When advancing, the new state consists of a new position, while the direction remains unchanged
  | Advance -> { currentState with Position = advance currentState.Direction currentState.Position }

  // When rotating, the new state consists of a new direction, while the position remains unchanged
  | RotateRight -> { currentState with Direction = rotateRight currentState.Direction }
  | RotateLeft -> { currentState with Direction = rotateLeft currentState.Direction }

/// Parse the given instruction text to a list of instructions.
/// For example: given `A3` this will output `[Advance; Advance; Advance]`,
/// and given `R180` it will output `[RotateRight; RotateRight]`.
/// Attempting to parse an invalid instruction will throw an error.
let parseInstruction (instruction: string): Instruction list =
  match instruction[0], int (instruction.Substring(1)) with
  | 'A', steps when steps >= 0 -> List.replicate steps Advance
  | 'R', degrees when degrees >= 0 && degrees % 90 = 0 -> List.replicate (degrees / 90) RotateRight
  | 'L', degrees when degrees >= 0 && degrees % 90 = 0 -> List.replicate (degrees / 90) RotateLeft
  | _ -> failwithf "Invalid instruction '%s'" instruction

let initialState = { Position = (0, 0); Direction = North }
let finalState =
  File.ReadAllLines("input.txt")
  |> Seq.collect parseInstruction
  |> Seq.fold applyInstruction initialState

printfn "Answer: %A" finalState.Position
// With the example input this would print "Answer: (3, -10)"
```

By taking the time to model the puzzle input using the F# type system, you end up with code that is easily composed from smaller parts, while the full implementation is still easy to follow. We are able to test the business logic easily because it only operates on valid inputs, and the type system can be used by the compiler to warn us if we forget to handle a specific type of instruction.

One more thing that is common in Advent of Code challenges is a small twist: each puzzle contains two parts, where the second part builds on the first. So, with the above approach in mind, I challenge you to think about the following questions:

- What if the solution should allow for instructions with negative values? Specifically, you should be able to move backwards (`A-5`), and rotate a negative number of degrees (`R-90`, `L-270`).
- What if the solution should print the full path taken instead of just the final position?
- What if the solution should be able to handle arbitrary rotations, like 11 degrees?

For each of these cases, consider the impact on the solution above, and also how it would impact a more naïve solution (for instance: one single function that loops over each instruction and applies it directly without using any types).

## Closing notes

I had a lot of fun participating in Advent of Code 2020, while simultaneously practicing my F# skills. Of course it's not all rainbows and sunshine, there were a couple of puzzles where I had a hard time coming up with a clean way to solve it - I'm looking at you, [Jurassic Jigsaw](https://adventofcode.com/2020/day/20). Still, I'll gladly do this again this year.

For those interested, all of my Advent of Code solutions are available on GitHub: [sanderploegsma/advent-of-code](https://github.com/sanderploegsma/advent-of-code).

![I heart fsharp](i-heart-fsharp.png)

## Recommended reading

- If you haven't already, I can highly recommend checking out [F# for fun and profit](https://fsharpforfunandprofit.com/).
- The yearly [F# Advent Calendar](https://sergeytihon.com/2020/10/22/f-advent-calendar-in-english-2020/) series contains a lot of blog posts about F#, there's some good stuff in there.
