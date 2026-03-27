import pandas as pd

def mux(d0, d1, s):
    """Simulates the 2-to-1 Multiplexer."""
    return d1 if s else d0

def full_adder(a, b, cin):
    """Simulates a standard Full Adder."""
    sum_out = a ^ b ^ cin
    cout = (a & b) | (cin & (a ^ b))
    return sum_out, cout

def alu_bit_logic(b1_i, b1_ip1, b1_im1, b2_i, cin, operation):
    """
    Simulates the logic for a single TSC ALU bit.
    Based on lab instructions for BUS 1, BUS 2, and control signals.
    """
    # 1. Left Combinational Logic
    # S (MUX Select) is high if SUB or TCP is asserted 
    s_select = 1 if operation in ['SUB', 'TCP'] else 0
    
    # Input A to the adder is BUS 1i unless TCP is asserted (forced to 0) 
    a_input = b1_i if operation != 'TCP' else 0

    # 2. Multiplexer (MUX)
    # D0 is BUS 2i, D1 is NOT BUS 2i 
    d0 = b2_i
    d1 = 1 - b2_i
    b_input = mux(d0, d1, s_select)

    # 3. Full Adder calculation
    sum_res, cout_res = full_adder(a_input, b_input, cin)

    # 4. Right Combinational Logic (Pass-gates)
    # Only one control signal is asserted at a time 
    if operation in ['ADD', 'SUB', 'TCP']:
        b3_i = sum_res
    elif operation == 'AND':
        b3_i = b1_i & b2_i
    elif operation == 'OR':
        b3_i = b1_i | b2_i
    elif operation == 'NOT':
        b3_i = 1 - b2_i
    elif operation == 'SHL':
        b3_i = b1_im1 # Shift Left uses the i-1 bit 
    elif operation == 'SHR':
        b3_i = b1_ip1 # Shift Right uses the i+1 bit 
    elif operation == 'TRA1':
        b3_i = b1_i
    else:
        b3_i = 0

    return b3_i, cout_res

# --- Generate Truth Table for Visualization ---
ops = ['ADD', 'SUB', 'AND', 'OR', 'NOT', 'TCP', 'SHL', 'SHR', 'TRA1']
table_data = []

for op in ops:
    for b1i in [0, 1]:
        for b2i in [0, 1]:
            # Simple demonstration values for neighbors/carry
            b3i, cout = alu_bit_logic(b1i, 1, 1, b2i, 0, op)
            table_data.append({
                'Operation': op,
                'BUS 1i': b1i,
                'BUS 2i': b2i,
                'CIN': 0,
                'BUS 3i (Result)': b3i,
                'COUT': cout
            })

# Display a sample of the results
df = pd.DataFrame(table_data)
print(df.head(15))