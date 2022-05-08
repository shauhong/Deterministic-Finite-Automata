from copy import deepcopy
import re


class DFA:
    """
    Deterministic Finite Automata

    Args:
        states (list[string]): Finite set of states 
        start_state (string): Start state
        final_states (list[string]): Finite set of final states
        transition (dict(dict)): Transition function
        alphabet (list[string]): Alphabet
    """

    def __init__(self, states, start_state, final_states, transition, alphabet=None):
        self.states = states
        self.start_state = start_state
        self.final_states = final_states
        self.transition = transition
        self.alphabet = alphabet
        self.init()

    def __call__(self, x):
        """
        Deterministic Finite Automata takes current state and input symbol and transition to next state

        Args:
            x (string): Input symbol
        """
        if self.alphabet and x not in self.alphabet:
            raise Exception(f"{x} not in defined alphabets")
        if self.current_state in self.transition and x in self.transition[self.current_state]:
            self.current_state = self.transition[self.current_state][x]
        else:
            self.current_state = None

    def init(self):
        """
        Initialize Deterministic Finite Automata to the start state
        """
        self.current_state = self.start_state

    def accept(self):
        """
        Check the Deterministic Finite Automata is in one of the final states

        Return:
            Boolean: Accept status
        """
        return self.current_state in self.final_states

    def trapped(self):
        """
        Check the Deterministic Finite Automata is in trap state

        Return:
            Boolean: Trap status
        """
        return self.current_state is None


def construct_dfa(words):
    """
    Construct Deterministic Finite Automata

    Args:
        words (list[string]): Words in the Deterministic Finite Automata langauge
    Return:
        tuple[list, list, string, list, dict]: A tuple of formal description of Deterministic Finite Automata 
        (alphabet, states, start_state, final_states, transition)
    """
    start_state = "q0"
    alphabet = set()
    states = set()
    states.add(start_state)
    final_states = list()
    transition = dict()
    last_state = start_state

    for word in words:
        current_state = start_state
        for char in word:
            if current_state not in transition:
                transition[current_state] = dict()
            if char not in transition[current_state]:
                last = int(re.sub("q", "", last_state)) + 1
                new_state = f"q{last}"
                states.add(current_state)
                transition[current_state].update({char: new_state})
            alphabet.add(char)
            current_state = transition[current_state][char]
            if int(re.sub("q", "", current_state)) > int(re.sub("q", "", last_state)):
                last_state = current_state
        final_states.append(current_state)

    return list(alphabet), list(states), start_state, final_states, transition


def process_text(dfa, text):
    """
    Recognize string that is in the language of the Deterministic Finite Automata

    Args:
        dfa (DFA): Deterministic Finite Automata
        text (string): Input text
    Return:
        list[tuple[int, int]]: List of tuple that contain the start and end positions of the strings
        recognized and accepted by the Deterministic Finite Automata 
    """
    dfa.init()
    matches = list()
    start = 0
    end = 0

    for index, char in enumerate(text):
        dfa(char)
        if dfa.accept():
            end = index
            matches.append((start, end))
        if dfa.trapped():
            dfa.init()
            dfa(char)
            start = index
            end = index

    matches = remove_redundant_match(matches)
    patterns = [text[match[0]:match[1]+1]
                for match in sorted(matches, key=lambda x: x[0])]
    return matches, patterns


def remove_redundant_match(matches):
    """
    Remove redundant matches and retain only the match with the longest length

    Args:
        matches (list[tuple[int, int]]): List of tuple that contain the redundant start and end positions 
        of the strings recognized and accepted by the Deterministic Finite Automata 
    Return:
        list[tuple(int, int)]: List of tuple that contain the non-redundant start and end positions
        of the strings recognized and accepted by the Deterministic Finite Automata 
    """
    matches = deepcopy(matches)
    removed = dict()

    for match in matches:
        start, end = match
        if start not in removed or removed[start] < end:
            removed[start] = end

    matches = [(start, end) for start, end in removed.items()]
    return matches
