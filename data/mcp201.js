window.studyData = window.studyData || {};
window.studyData.mcp201 = [
    {
        "term": "What is an interrupt in a microcontroller system?",
        "options": [
            "(a) A hardware-triggered asynchronous routine",
            "(b) A loop that checks a flag repeatedly",
            "(c) A fixed delay inserted by software",
            "(d) A permanent reset of the processor Đáp án đúng: A. A hardware-triggered asynchronous routine Giải thích: Interrupt là cơ chế phần cứng báo cho CPU biết có một sự kiện cần xử lý. Nó không phải là vòng lặp kiểm tra liên tục như polling, mà là một ISR được gọi khi có tín hiệu từ ngoại vi hoặc thiết bị bên ngoài."
        ],
        "answerIndex": 0,
        "definition": "(a) A hardware-triggered asynchronous routine"
    },
    {
        "term": "Why are interrupts usually preferred over polling for detecting a switch press?",
        "options": [
            "(a) They require the CPU to check the switch more often",
            "(b) They run only when needed and reduce wasted CPU time",
            "(c) They always disable all other hardware",
            "(d) They remove the need for any software routine Đáp án đúng: B. They run only when needed and reduce wasted CPU time Giải thích: Interrupt chỉ chạy khi sự kiện thật sự xảy ra nên CPU không phải liên tục kiểm tra trạng thái công tắc. Vì vậy hệ thống phản hồi nhanh hơn và tiết kiệm thời gian xử lý hơn so với polling."
        ],
        "answerIndex": 0,
        "definition": "(a) They require the CPU to check the switch more often"
    },
    {
        "term": "Which statement best describes polling?",
        "options": [
            "(a) The NVIC automatically prioritizes an event",
            "(b) The CPU saves registers onto the stack",
            "(c) The processor regularly checks an input or flag in software",
            "(d) A handler runs immediately after reset Đáp án đúng: C. The processor regularly checks an input or flag in software Giải thích: Polling nghĩa là chương trình chính liên tục đọc một cờ hoặc một chân input để xem sự kiện đã xảy ra chưa. Cách này đơn giản nhưng tốn CPU, đặc biệt khi cần kiểm tra nhiều nguồn sự kiện."
        ],
        "answerIndex": 0,
        "definition": "(a) The NVIC automatically prioritizes an event"
    },
    {
        "term": "In the example system, what happens when switch SW is pressed?",
        "options": [
            "(a) The main code disables the RGB LED forever",
            "(b) The DAC generates a triangular waveform",
            "(c) The RTOS creates a new thread",
            "(d) The ISR increments a count variable Đáp án đúng: D. The ISR increments a count variable Giải thích: Trong ví dụ của chapter, khi công tắc SW được nhấn, ISR sẽ tăng biến count. Sau đó main code dùng giá trị count để điều khiển LED RGB theo dạng nhị phân."
        ],
        "answerIndex": 0,
        "definition": "(a) The main code disables the RGB LED forever"
    },
    {
        "term": "During exception entry on Arm Cortex-M, which action is performed by hardwired CPU processing?",
        "options": [
            "(a) Context registers are pushed onto the current stack",
            "(b) The source code is recompiled",
            "(c) All program memory is erased",
            "(d) The baud rate is changed to 9600 Đáp án đúng: A. Context registers are pushed onto the current stack Giải thích: Khi exception xảy ra, CPU tự thực hiện các bước phần cứng như lưu ngữ cảnh lên stack trước khi nhảy vào handler. Việc này giúp sau khi ISR kết thúc, chương trình chính có thể tiếp tục đúng tại vị trí trước đó."
        ],
        "answerIndex": 0,
        "definition": "(a) Context registers are pushed onto the current stack"
    },
    {
        "term": "Which registers are part of the basic exception stack frame on Cortex-M?",
        "options": [
            "(a) R4 through R11 only",
            "(b) R0, R1, R2, R3, R12, LR, PC, and xPSR",
            "(c) SCLK, COTI, CITO, and CS",
            "(d) ADC, DAC, PWM, and UART Đáp án đúng: B. R0, R1, R2, R3, R12, LR, PC, and xPSR Giải thích: Stack frame cơ bản của Cortex-M lưu R0, R1, R2, R3, R12, LR, PC và xPSR. Đây là các thanh ghi tối thiểu cần phục hồi để quay lại luồng chương trình trước khi interrupt xảy ra."
        ],
        "answerIndex": 0,
        "definition": "(a) R4 through R11 only"
    },
    {
        "term": "What happens to the processor mode when an exception handler starts executing?",
        "options": [
            "(a) It switches permanently to User mode",
            "(b) It always enters an inactive thread state",
            "(c) It switches to Handler mode and privileged execution",
            "(d) It disables the stack pointer completely Đáp án đúng: C. It switches to Handler mode and privileged execution Giải thích: Khi vào exception handler, Cortex-M chuyển sang Handler mode và chạy ở privileged mode. Chế độ này cho phép handler truy cập các tài nguyên hệ thống quan trọng như NVIC, SysTick và System Control Block."
        ],
        "answerIndex": 0,
        "definition": "(a) It switches permanently to User mode"
    },
    {
        "term": "What does the IPSR contain during exception handling?",
        "options": [
            "(a) The PWM duty cycle",
            "(b) The UART stop-bit setting",
            "(c) The ADC reference voltage",
            "(d) The exception number Đáp án đúng: D. The exception number Giải thích: IPSR là phần của xPSR dùng để lưu số exception đang được xử lý. Nhờ giá trị này, CPU và debugger có thể biết handler hiện tại tương ứng với exception hoặc interrupt nào."
        ],
        "answerIndex": 0,
        "definition": "(a) The PWM duty cycle"
    },
    {
        "term": "Why can vectors in the vector table appear as odd addresses?",
        "options": [
            "(a) The least significant bit indicates Thumb code",
            "(b) The address points to analog memory",
            "(c) Odd vectors always mean errors",
            "(d) The stack grows upward Đáp án đúng: A. The least significant bit indicates Thumb code Giải thích: Trong vector table của Cortex-M, bit thấp nhất của địa chỉ vector được dùng để chỉ báo handler chạy ở Thumb state. Vì bit này bằng 1 nên địa chỉ hiển thị có thể trông như là số lẻ."
        ],
        "answerIndex": 0,
        "definition": "(a) The least significant bit indicates Thumb code"
    },
    {
        "term": "What information does an EXC_RETURN value provide?",
        "options": [
            "(a) Which ADC channel should be sampled",
            "(b) Which mode and stack pointer should be used when returning",
            "(c) Which UART character should be transmitted",
            "(d) Which LED color should be displayed Đáp án đúng: B. Which mode and stack pointer should be used when returning Giải thích: EXC_RETURN là giá trị đặc biệt được CPU đặt vào LR khi vào exception. Nó cho biết khi thoát handler thì quay về Thread hay Handler mode và dùng MSP hay PSP để phục hồi stack frame."
        ],
        "answerIndex": 0,
        "definition": "(a) Which ADC channel should be sampled"
    },
    {
        "term": "Which EXC_RETURN value represents returning to Thread mode using MSP?",
        "options": [
            "(a) 0xFFFF_FFFD",
            "(b) 0x0000_0000",
            "(c) 0xFFFF_FFF9",
            "(d) 0x0000_0040 Đáp án đúng: C. 0xFFFF_FFF9 Giải thích: Giá trị 0xFFFF_FFF9 biểu thị return về Thread mode và phục hồi ngữ cảnh từ Main Stack Pointer (MSP). Đây là trường hợp thường gặp khi interrupt xảy ra trong chương trình chính đang dùng MSP."
        ],
        "answerIndex": 0,
        "definition": "(a) 0xFFFF_FFFD"
    },
    {
        "term": "What is the role of the NVIC?",
        "options": [
            "(a) It converts analog signals to digital samples",
            "(b) It generates UTF-8 characters",
            "(c) It stores file system directories",
            "(d) It manages and prioritizes external interrupts Đáp án đúng: D. It manages and prioritizes external interrupts Giải thích: NVIC là bộ điều khiển interrupt lồng nhau của Cortex-M. Nó quản lý, bật/tắt, ghi nhận pending và sắp xếp mức ưu tiên của các external interrupts."
        ],
        "answerIndex": 0,
        "definition": "(a) It converts analog signals to digital samples"
    },
    {
        "term": "What does it mean when an interrupt is pending?",
        "options": [
            "(a) It has been requested but has not yet been serviced",
            "(b) It has been permanently disabled",
            "(c) It has completed and returned to thread mode",
            "(d) It is being converted by a DAC Đáp án đúng: A. It has been requested but has not yet been serviced Giải thích: Một interrupt ở trạng thái pending nghĩa là nó đã được yêu cầu nhưng CPU chưa bắt đầu chạy ISR tương ứng. Nó có thể đang chờ vì bị mask, bị interrupt ưu tiên cao hơn chặn hoặc CPU chưa sẵn sàng xử lý."
        ],
        "answerIndex": 0,
        "definition": "(a) It has been requested but has not yet been serviced"
    },
    {
        "term": "Which CMSIS function enables an IRQ?",
        "options": [
            "(a) NVIC_StartADC(IRQnum)",
            "(b) NVIC_EnableIRQ(IRQnum)",
            "(c) Thread::wait(IRQnum)",
            "(d) AnalogOut.write(IRQnum) Đáp án đúng: B. NVIC_EnableIRQ(IRQnum) Giải thích: Hàm CMSIS NVIC_EnableIRQ(IRQnum) dùng để bật một interrupt cụ thể trong NVIC. Nếu không enable IRQ, interrupt đó có thể được cấu hình ở ngoại vi nhưng CPU vẫn không nhận để chạy ISR."
        ],
        "answerIndex": 0,
        "definition": "(a) NVIC_StartADC(IRQnum)"
    },
    {
        "term": "What is PRIMASK mainly used for?",
        "options": [
            "(a) Selecting the UART parity bit",
            "(b) Setting PWM frequency only",
            "(c) Masking configurable-priority exceptions to protect critical sections",
            "(d) Choosing an SPI chip-select line Đáp án đúng: C. Masking configurable-priority exceptions to protect critical sections Giải thích: PRIMASK dùng để mask hầu hết các exception có thể cấu hình priority, thường dùng trong critical section. Khi cần bảo vệ dữ liệu dùng chung khỏi bị ISR chen vào, chương trình có thể tạm thời disable interrupt bằng PRIMASK."
        ],
        "answerIndex": 0,
        "definition": "(a) Selecting the UART parity bit"
    },
    {
        "term": "In exception prioritization, which priority number represents higher priority?",
        "options": [
            "(a) A larger number",
            "(b) Only an even number",
            "(c) Only a hexadecimal number ending in F",
            "(d) A smaller number Đáp án đúng: D. A smaller number Giải thích: Trong Cortex-M, số priority nhỏ hơn tương ứng với mức ưu tiên cao hơn. Vì vậy priority 0 thường mạnh hơn priority 1, 2 hoặc các số lớn hơn."
        ],
        "answerIndex": 0,
        "definition": "(a) A larger number"
    },
    {
        "term": "What is interrupt latency?",
        "options": [
            "(a) The delay between an interrupt request and the start of ISR execution",
            "(b) The number of bytes in an ASCII character",
            "(c) The voltage step of an ADC",
            "(d) The amount of memory assigned to a thread Đáp án đúng: A. The delay between an interrupt request and the start of ISR execution Giải thích: Interrupt latency là khoảng thời gian từ khi interrupt được yêu cầu đến khi lệnh đầu tiên của ISR bắt đầu chạy. Latency phụ thuộc vào phần cứng, việc lưu ngữ cảnh, priority và lệnh hiện tại của CPU."
        ],
        "answerIndex": 0,
        "definition": "(a) The delay between an interrupt request and the start of ISR execution"
    },
    {
        "term": "According to the simplified maximum interrupt rate model, what happens when ISR cycles and overhead cycles increase?",
        "options": [
            "(a) The maximum interrupt frequency becomes infinite",
            "(b) The maximum interrupt frequency decreases",
            "(c) The CPU clock frequency automatically doubles",
            "(d) The stack pointer stops changing Đáp án đúng: B. The maximum interrupt frequency decreases Giải thích: Khi ISR mất nhiều chu kỳ hơn hoặc overhead vào/ra interrupt tăng, mỗi lần xử lý interrupt tiêu tốn nhiều thời gian CPU hơn. Do đó số interrupt tối đa có thể xử lý trong một giây sẽ giảm."
        ],
        "answerIndex": 0,
        "definition": "(a) The maximum interrupt frequency becomes infinite"
    },
    {
        "term": "Why should some shared variables be declared volatile?",
        "options": [
            "(a) They must always be stored in flash memory",
            "(b) They are converted to analog voltages",
            "(c) They may change outside the compiler's immediate control",
            "(d) They can only be written by a DAC Đáp án đúng: C. They may change outside the compiler's immediate control Giải thích: volatile báo cho compiler rằng biến có thể thay đổi bởi yếu tố ngoài luồng code hiện tại, ví dụ ISR. Nếu không khai báo volatile, compiler có thể tối ưu sai bằng cách giữ giá trị cũ trong thanh ghi."
        ],
        "answerIndex": 0,
        "definition": "(a) They must always be stored in flash memory"
    },
    {
        "term": "What is a race condition?",
        "options": [
            "(a) A UART mode with two stop bits",
            "(b) A type of flash ADC converter",
            "(c) A timer prescaler value",
            "(d) Unexpected behavior caused by timing-dependent access to shared data Đáp án đúng: D. Unexpected behavior caused by timing-dependent access to shared data Giải thích: Race condition xảy ra khi main code và ISR hoặc nhiều thread cùng truy cập dữ liệu dùng chung theo thứ tự phụ thuộc thời gian. Kết quả có thể sai hoặc không ổn định vì một phần dữ liệu bị thay đổi giữa chừng. Chapter 7: Analog Input and Output"
        ],
        "answerIndex": 0,
        "definition": "(a) A UART mode with two stop bits"
    },
    {
        "term": "Why do processors need ADCs and DACs when working with real-world signals?",
        "options": [
            "(a) Processors are digital, while many real-world signals are analog",
            "(b) Processors can only process sound waves directly",
            "(c) Analog signals are always binary",
            "(d) Digital signals cannot be stored Đáp án đúng: A. Processors are digital, while many real-world signals are analog Giải thích: Các bộ xử lý làm việc với dữ liệu số, còn cảm biến, âm thanh, ánh sáng hay điện áp ngoài đời thường là tín hiệu analog. ADC và DAC tạo cầu nối giữa hai thế giới này: analog sang digital và digital sang analog."
        ],
        "answerIndex": 0,
        "definition": "(a) Processors are digital, while many real-world signals are analog"
    },
    {
        "term": "What is the main function of an Analog-to-Digital Converter (ADC)?",
        "options": [
            "(a) Convert a digital number into a continuous voltage",
            "(b) Convert an analog input amplitude into a discrete digital number",
            "(c) Generate a clock signal for SPI",
            "(d) Protect shared memory in an RTOS Đáp án đúng: B. Convert an analog input amplitude into a discrete digital number Giải thích: ADC chuyển biên độ tín hiệu analog tại thời điểm lấy mẫu thành một số digital rời rạc. Nhờ đó vi điều khiển có thể đọc điện áp cảm biến hoặc các đại lượng vật lý đã được biến đổi thành điện áp."
        ],
        "answerIndex": 0,
        "definition": "(a) Convert a digital number into a continuous voltage"
    },
    {
        "term": "What is the main function of a Digital-to-Analog Converter (DAC)?",
        "options": [
            "(a) Convert analog data into ASCII characters",
            "(b) Schedule real-time tasks",
            "(c) Convert digital data into an analog signal",
            "(d) Detect UART start bits Đáp án đúng: C. Convert digital data into an analog signal Giải thích: DAC làm thao tác ngược với ADC: nhận dữ liệu số và tạo tín hiệu analog tương ứng như điện áp, dòng điện hoặc điện tích. Ví dụ DAC có thể tạo tín hiệu analog để đưa vào mạch khuếch đại âm thanh."
        ],
        "answerIndex": 0,
        "definition": "(a) Convert analog data into ASCII characters"
    },
    {
        "term": "Which stage keeps the analog signal constant during ADC conversion?",
        "options": [
            "(a) Chip select",
            "(b) Semaphore",
            "(c) Exception return",
            "(d) Sample-and-hold Đáp án đúng: D. Sample-and-hold Giải thích: Sample-and-hold giữ mức điện áp analog ổn định trong lúc ADC đang chuyển đổi. Nếu tín hiệu thay đổi trong thời gian chuyển đổi, kết quả digital có thể không đại diện chính xác cho một thời điểm cụ thể."
        ],
        "answerIndex": 0,
        "definition": "(a) Chip select"
    },
    {
        "term": "Why is a multiplexer often used before an ADC?",
        "options": [
            "(a) To select among multiple analog input channels while reducing ADC hardware",
            "(b) To increase the number of UART stop bits",
            "(c) To make the signal asynchronous",
            "(d) To disable interrupts during conversion Đáp án đúng: A. To select among multiple analog input channels while reducing ADC hardware Giải thích: Multiplexer cho phép nhiều kênh analog dùng chung một ADC bằng cách chọn từng kênh để đưa vào bộ chuyển đổi. Cách này giảm số ADC cần tích hợp, đổi lại tốc độ chuyển đổi cho từng kênh có thể giảm."
        ],
        "answerIndex": 0,
        "definition": "(a) To select among multiple analog input channels while reducing ADC hardware"
    },
    {
        "term": "For an n-bit DAC, why does the maximum output not normally reach the reference voltage exactly?",
        "options": [
            "(a) The reference voltage is always zero",
            "(b) The maximum digital value is 2^n - 1, not 2^n",
            "(c) The DAC output is always digital",
            "(d) The sample-and-hold prevents output Đáp án đúng: B. The maximum digital value is 2^n - 1, not 2^n Giải thích: Với n bit, giá trị digital lớn nhất là 2^n - 1 chứ không phải 2^n. Vì vậy điện áp DAC lớn nhất thường là Vr x (2^n - 1)/2^n, nhỏ hơn Vr một bước lượng tử."
        ],
        "answerIndex": 0,
        "definition": "(a) The reference voltage is always zero"
    },
    {
        "term": "What analog output range is shown for a 3-bit DAC triangular wave example?",
        "options": [
            "(a) 0 to exactly 8 times the reference voltage",
            "(b) Only -1 V to +1 V",
            "(c) 0 to 7/8 of the reference voltage",
            "(d) Only logic 0 and logic 1 Đáp án đúng: C. 0 to 7/8 of the reference voltage Giải thích: Với DAC 3 bit, các mã digital chạy từ 000 đến 111, tức 0 đến 7. Do đó mức ra tương ứng từ 0 đến 7/8 của điện áp tham chiếu, không đạt đúng Vr."
        ],
        "answerIndex": 0,
        "definition": "(a) 0 to exactly 8 times the reference voltage"
    },
    {
        "term": "Which ADC type compares input voltage with many reference levels?",
        "options": [
            "(a) Mutex converter",
            "(b) UART converter",
            "(c) PWM converter",
            "(d) Flash converter Đáp án đúng: D. Flash converter Giải thích: Flash ADC dùng nhiều bộ so sánh để so input với các mức tham chiếu khác nhau. Ưu điểm là rất nhanh, nhưng số comparator tăng mạnh theo số bit nên tốn phần cứng."
        ],
        "answerIndex": 0,
        "definition": "(a) Mutex converter"
    },
    {
        "term": "Which ADC type converts voltage into capacitor charge time?",
        "options": [
            "(a) Slope converter",
            "(b) Flash memory controller",
            "(c) SPI shifter",
            "(d) Thread scheduler Đáp án đúng: A. Slope converter Giải thích: Slope ADC biến điện áp input thành quá trình nạp hoặc xả tụ rồi đo thời gian. Vì kết quả phụ thuộc thời gian nạp/xả, nó cần clock và mạch ổn định để đạt độ chính xác tốt."
        ],
        "answerIndex": 0,
        "definition": "(a) Slope converter"
    },
    {
        "term": "What does ADC resolution describe?",
        "options": [
            "(a) The number of threads in the RTOS",
            "(b) The number of discrete output values over the analog range",
            "(c) The speed of the UART start bit",
            "(d) The number of chip-select lines Đáp án đúng: B. The number of discrete output values over the analog range Giải thích: Độ phân giải ADC cho biết có bao nhiêu mức digital rời rạc có thể biểu diễn trong toàn dải điện áp analog. Độ phân giải càng cao thì bước LSB càng nhỏ và sai số lượng tử lý tưởng càng giảm."
        ],
        "answerIndex": 0,
        "definition": "(a) The number of threads in the RTOS"
    },
    {
        "term": "How many discrete values does an 8-bit ADC ideally provide?",
        "options": [
            "(a) 8",
            "(b) 128",
            "(c) 256",
            "(d) 1024 Đáp án đúng: C. 256 Giải thích: ADC 8 bit có 2^8 mức khác nhau, tức 256 giá trị từ 0 đến 255. Đây là số mức digital lý tưởng mà ADC có thể tạo ra trên toàn dải đo."
        ],
        "answerIndex": 0,
        "definition": "(a) 8"
    },
    {
        "term": "For an 8-bit ADC with a 10 V range, what is the approximate LSB voltage?",
        "options": [
            "(a) 256/10 V",
            "(b) 10 x 256 V",
            "(c) 8/10 V",
            "(d) 10/256 V Đáp án đúng: D. 10/256 V Giải thích: LSB voltage bằng dải điện áp chia cho số mức lượng tử. Với ADC 8 bit dải 10 V, bước nhỏ nhất xấp xỉ 10/256 V, tức khoảng 0.039 V mỗi mức."
        ],
        "answerIndex": 0,
        "definition": "(a) 256/10 V"
    },
    {
        "term": "What is quantization error?",
        "options": [
            "(a) The rounding error between the actual analog input and the digitized value",
            "(b) The delay before an interrupt handler starts",
            "(c) The difference between UART TX and RX pins",
            "(d) The number of tasks blocked by a semaphore Đáp án đúng: A. The rounding error between the actual analog input and the digitized value Giải thích: Quantization error là sai lệch giữa giá trị analog thật và giá trị digital sau khi làm tròn hoặc lượng tử hóa. Sai số này tồn tại ngay cả trong ADC lý tưởng vì digital chỉ có số mức hữu hạn."
        ],
        "answerIndex": 0,
        "definition": "(a) The rounding error between the actual analog input and the digitized value"
    },
    {
        "term": "According to the Shannon-Nyquist theorem, the sampling frequency must be at least:",
        "options": [
            "(a) Equal to the lowest frequency in the input signal",
            "(b) Twice the highest frequency in the input signal",
            "(c) One-half of the reference voltage",
            "(d) Exactly 9600 samples per second Đáp án đúng: B. Twice the highest frequency in the input signal Giải thích: Theo định lý Shannon-Nyquist, tần số lấy mẫu phải ít nhất gấp đôi tần số cao nhất của tín hiệu đầu vào. Nếu thấp hơn mức này, thông tin tần số có thể bị chồng lấn và không thể khôi phục chính xác."
        ],
        "answerIndex": 0,
        "definition": "(a) Equal to the lowest frequency in the input signal"
    },
    {
        "term": "What can happen if the sampling frequency is too low?",
        "options": [
            "(a) Thread termination",
            "(b) Chip-select locking",
            "(c) Aliasing",
            "(d) Mutex ownership Đáp án đúng: C. Aliasing Giải thích: Aliasing xảy ra khi lấy mẫu quá chậm khiến tín hiệu tần số cao bị nhìn nhầm thành tần số thấp. Đây là lý do hệ thống ADC cần chọn sampling frequency đủ lớn và thường cần lọc chống alias trước ADC."
        ],
        "answerIndex": 0,
        "definition": "(a) Thread termination"
    },
    {
        "term": "Which Mbed class is used for analog input?",
        "options": [
            "(a) DigitalInOut",
            "(b) Semaphore",
            "(c) Ticker",
            "(d) AnalogIn Đáp án đúng: D. AnalogIn Giải thích: Trong Mbed, AnalogIn là class dùng để đọc tín hiệu analog từ chân hỗ trợ ADC. Nó cung cấp các hàm như read() và read_u16() để lấy giá trị đã chuyển đổi."
        ],
        "answerIndex": 0,
        "definition": "(a) DigitalInOut"
    },
    {
        "term": "Which Mbed class is used for analog output?",
        "options": [
            "(a) AnalogOut",
            "(b) Serial",
            "(c) Mutex",
            "(d) Thread Đáp án đúng: A. AnalogOut Giải thích: AnalogOut là class dùng để xuất tín hiệu analog thông qua DAC trên các chân hỗ trợ. Nó nhận giá trị digital từ chương trình và tạo điện áp analog tương ứng."
        ],
        "answerIndex": 0,
        "definition": "(a) AnalogOut"
    },
    {
        "term": "In the Mbed AnalogIn API, what does read() return?",
        "options": [
            "(a) A UART character only",
            "(b) A floating-point value in the range 0.0 to 1.0",
            "(c) A raw interrupt number",
            "(d) A task priority Đáp án đúng: B. A floating-point value in the range 0.0 to 1.0 Giải thích: Hàm read() của AnalogIn trả về giá trị float chuẩn hóa từ 0.0 đến 1.0. Giá trị này đại diện cho tỉ lệ giữa điện áp input và dải đo/reference của ADC."
        ],
        "answerIndex": 0,
        "definition": "(a) A UART character only"
    },
    {
        "term": "In the Mbed AnalogIn API, what does read_u16() return?",
        "options": [
            "(a) A floating-point duty cycle only",
            "(b) A thread state",
            "(c) An unsigned 16-bit value representing the analog input",
            "(d) A chip-select level Đáp án đúng: C. An unsigned 16-bit value representing the analog input Giải thích: Hàm read_u16() trả về giá trị unsigned 16-bit. Dù độ phân giải phần cứng có thể khác, API biểu diễn kết quả theo thang 16 bit để thuận tiện xử lý."
        ],
        "answerIndex": 0,
        "definition": "(a) A floating-point duty cycle only"
    },
    {
        "term": "What is a typical application of a DAC mentioned in the material?",
        "options": [
            "(a) Prioritizing external interrupts",
            "(b) Creating a mutex for standard output",
            "(c) Selecting an I2C target address",
            "(d) Driving an earphone or speaker amplifier to produce sound Đáp án đúng: D. Driving an earphone or speaker amplifier to produce sound Giải thích: DAC có thể dùng để tạo tín hiệu analog cho âm thanh, ví dụ đưa vào earphone hoặc speaker amplifier. Vì âm thanh trong không khí là tín hiệu analog, dữ liệu số cần được chuyển lại thành dạng analog để phát ra. Chapter 8: Timer and Pulse-Width Modulation"
        ],
        "answerIndex": 0,
        "definition": "(a) Prioritizing external interrupts"
    },
    {
        "term": "What is a hardware timer?",
        "options": [
            "(a) A digital counter driven by a regular clock source",
            "(b) A converter from analog voltage to binary code",
            "(c) A text encoding system",
            "(d) A memory protection object Đáp án đúng: A. A digital counter driven by a regular clock source Giải thích: Hardware timer là một bộ đếm số chạy theo clock đều và ổn định. Nó giúp đo thời gian hoặc tạo sự kiện định kỳ chính xác hơn so với việc đếm bằng vòng lặp phần mềm."
        ],
        "answerIndex": 0,
        "definition": "(a) A digital counter driven by a regular clock source"
    },
    {
        "term": "What usually happens when a hardware timer reaches zero or a predefined value?",
        "options": [
            "(a) It converts a byte to ASCII",
            "(b) It resets and may generate an interrupt",
            "(c) It locks a mutex permanently",
            "(d) It changes UART from asynchronous to synchronous Đáp án đúng: B. It resets and may generate an interrupt Giải thích: Khi timer đạt 0 hoặc đạt giá trị đặt trước, nó có thể tự reset và tạo interrupt. Interrupt này giúp CPU thực hiện tác vụ định kỳ hoặc phản hồi một mốc thời gian mà không phải polling liên tục."
        ],
        "answerIndex": 0,
        "definition": "(a) It converts a byte to ASCII"
    },
    {
        "term": "Compared with a hardware timer, a software timer usually has:",
        "options": [
            "(a) Higher precision and no hardware dependency",
            "(b) No relation to interrupts",
            "(c) Lower time precision but more possible instances",
            "(d) Only analog output capability Đáp án đúng: C. Lower time precision but more possible instances Giải thích: Software timer thường dựa trên một hardware timer và được cập nhật bằng interrupt hoặc scheduler. Nó linh hoạt vì có thể tạo nhiều instance, nhưng độ chính xác thường thấp hơn hardware timer trực tiếp."
        ],
        "answerIndex": 0,
        "definition": "(a) Higher precision and no hardware dependency"
    },
    {
        "term": "What is the function of a timer prescaler?",
        "options": [
            "(a) It stores the current UART character",
            "(b) It locks access to shared data",
            "(c) It converts binary to voltage",
            "(d) It divides the clock frequency by a predefined value Đáp án đúng: D. It divides the clock frequency by a predefined value Giải thích: Prescaler chia tần số clock đầu vào xuống mức phù hợp cho timer. Ví dụ chia 48 MHz xuống thấp hơn để timer có tick chậm hơn, dễ tạo khoảng thời gian dài hơn."
        ],
        "answerIndex": 0,
        "definition": "(a) It stores the current UART character"
    },
    {
        "term": "What is the timer register driven by?",
        "options": [
            "(a) Ticks from the prescaler output",
            "(b) ASCII codes from the UART",
            "(c) The ADC reference voltage",
            "(d) Mutex ownership flags Đáp án đúng: A. Ticks from the prescaler output Giải thích: Timer register được tăng hoặc giảm theo các tick từ prescaler output. Vì mỗi tick tương ứng một khoảng thời gian cố định, giá trị thanh ghi timer có thể dùng để đo hoặc tạo thời gian."
        ],
        "answerIndex": 0,
        "definition": "(a) Ticks from the prescaler output"
    },
    {
        "term": "What does a capture register do?",
        "options": [
            "(a) It sets the baud rate of a serial port",
            "(b) It loads the current timer value when a specified event occurs",
            "(c) It converts a voltage into a binary word",
            "(d) It stores a thread's stack size Đáp án đúng: B. It loads the current timer value when a specified event occurs Giải thích: Capture register chụp lại giá trị hiện tại của timer khi có sự kiện xảy ra. Bằng cách so sánh hai giá trị capture liên tiếp, ta có thể đo khoảng thời gian giữa hai sự kiện."
        ],
        "answerIndex": 0,
        "definition": "(a) It sets the baud rate of a serial port"
    },
    {
        "term": "What does a compare register do?",
        "options": [
            "(a) It compares ASCII with UTF-8",
            "(b) It selects an ADC channel",
            "(c) It compares a loaded value with the timer register value",
            "(d) It releases a semaphore Đáp án đúng: C. It compares a loaded value with the timer register value Giải thích: Compare register chứa một giá trị đặt trước và được so với timer register. Khi hai giá trị bằng nhau, phần cứng có thể tạo interrupt hoặc thay đổi output tùy chế độ."
        ],
        "answerIndex": 0,
        "definition": "(a) It compares ASCII with UTF-8"
    },
    {
        "term": "Which timer mode is mainly used to create a customized clock or periodic interrupt?",
        "options": [
            "(a) Capture mode only",
            "(b) UART mode",
            "(c) Mutex mode",
            "(d) Compare mode Đáp án đúng: D. Compare mode Giải thích: Compare mode dùng giá trị compare để tạo sự kiện đúng thời điểm mong muốn. Vì vậy nó phù hợp để tạo clock tùy chỉnh hoặc interrupt định kỳ."
        ],
        "answerIndex": 0,
        "definition": "(a) Capture mode only"
    },
    {
        "term": "Which timer mode is especially useful for measuring time intervals between events?",
        "options": [
            "(a) Capture mode",
            "(b) DAC mode",
            "(c) RTOS mode",
            "(d) ASCII mode Đáp án đúng: A. Capture mode Giải thích: Capture mode rất hữu ích khi cần đo thời điểm một tín hiệu ngoài xảy ra. Nó ghi lại timer value tại cạnh hoặc sự kiện, từ đó tính chu kỳ, tần số hoặc độ rộng xung."
        ],
        "answerIndex": 0,
        "definition": "(a) Capture mode"
    },
    {
        "term": "What does PWM stand for?",
        "options": [
            "(a) Parallel-wire measurement",
            "(b) Pulse-width modulation",
            "(c) Processor wait mode",
            "(d) Peripheral waveform memory Đáp án đúng: B. Pulse-width modulation Giải thích: PWM là viết tắt của Pulse-Width Modulation, tức điều chế độ rộng xung. Thay vì thay đổi biên độ, PWM thay đổi tỉ lệ thời gian ở mức logic 1 trong mỗi chu kỳ."
        ],
        "answerIndex": 0,
        "definition": "(a) Parallel-wire measurement"
    },
    {
        "term": "In PWM, what does duty cycle describe?",
        "options": [
            "(a) The number of ADC channels available",
            "(b) The amount of stack used by an ISR",
            "(c) The proportion of the logic 1 state in one pulse period",
            "(d) The number of UART parity bits Đáp án đúng: C. The proportion of the logic 1 state in one pulse period Giải thích: Duty cycle là phần trăm thời gian xung ở mức 1 trong một chu kỳ. Ví dụ duty 50% nghĩa là tín hiệu bật một nửa thời gian và tắt một nửa thời gian."
        ],
        "answerIndex": 0,
        "definition": "(a) The number of ADC channels available"
    },
    {
        "term": "What is PWM mainly used to control?",
        "options": [
            "(a) The number of user accounts in an OS",
            "(b) The address of an exception vector",
            "(c) The encoding of printable characters",
            "(d) The power supplied to electrical devices Đáp án đúng: D. The power supplied to electrical devices Giải thích: PWM thường dùng để điều khiển công suất trung bình cấp cho thiết bị như LED, motor hoặc mạch nguồn. Thiết bị nhận xung bật/tắt nhanh và phản ứng như đang nhận mức công suất trung bình."
        ],
        "answerIndex": 0,
        "definition": "(a) The number of user accounts in an OS"
    },
    {
        "term": "In the PWM example, how can a 50% power output be generated?",
        "options": [
            "(a) Set reset value to 100 and compare value to 50",
            "(b) Set reset value to 50 and compare value to 1000",
            "(c) Disable the prescaler and use UART RX",
            "(d) Use a semaphore count of 2 Đáp án đúng: A. Set reset value to 100 and compare value to 50 Giải thích: Nếu timer reset ở 100 và compare ở 50, output bật trong 50 tick và tắt trong 50 tick còn lại. Tỉ lệ bật là 50/100 nên công suất trung bình xấp xỉ 50%."
        ],
        "answerIndex": 0,
        "definition": "(a) Set reset value to 100 and compare value to 50"
    },
    {
        "term": "Which Mbed Timer function starts a timer?",
        "options": [
            "(a) attach()",
            "(b) start()",
            "(c) baud()",
            "(d) lock() Đáp án đúng: B. start() Giải thích: Trong Mbed, hàm start() dùng để bắt đầu timer. Sau khi start, timer đếm thời gian cho đến khi stop hoặc reset tùy cách sử dụng."
        ],
        "answerIndex": 0,
        "definition": "(a) attach()"
    },
    {
        "term": "Which Mbed Timer function returns elapsed time in seconds?",
        "options": [
            "(a) read_u16()",
            "(b) format()",
            "(c) read()",
            "(d) release() Đáp án đúng: C. read() Giải thích: Hàm read() của Mbed Timer trả về thời gian đã trôi qua theo đơn vị giây dưới dạng số thực. Các hàm khác như read_ms() và read_us() trả về mili giây hoặc micro giây."
        ],
        "answerIndex": 0,
        "definition": "(a) read_u16()"
    },
    {
        "term": "What limitation is noted for Mbed timers based on 32-bit microsecond counters?",
        "options": [
            "(a) They can only measure one nanosecond",
            "(b) They cannot be stopped",
            "(c) They always require an external DAC",
            "(d) They can register only up to about 2^31-1 microseconds, about 30 minutes Đáp án đúng: D. They can register only up to about 2^31-1 microseconds, about 30 minutes Giải thích: Mbed Timer dựa trên bộ đếm microsecond 32 bit có giới hạn giá trị. Tài liệu nêu thời gian đo tối đa khoảng 2^31 - 1 microseconds, tức khoảng 30 phút; lâu hơn nên dùng RTC hoặc time()."
        ],
        "answerIndex": 0,
        "definition": "(a) They can only measure one nanosecond"
    },
    {
        "term": "What is a Ticker in Mbed?",
        "options": [
            "(a) A timer-based object that repeatedly calls a function at a specified interval",
            "(b) A UART parity checker",
            "(c) A DAC output waveform only",
            "(d) A memory allocation table Đáp án đúng: A. A timer-based object that repeatedly calls a function at a specified interval Giải thích: Ticker là đối tượng timer gọi lặp lại một hàm theo khoảng thời gian đã đặt. Nó hữu ích cho tác vụ định kỳ như đảo trạng thái LED hoặc cập nhật cảm biến theo chu kỳ."
        ],
        "answerIndex": 0,
        "definition": "(a) A timer-based object that repeatedly calls a function at a specified interval"
    },
    {
        "term": "What should be avoided inside a ticker ISR?",
        "options": [
            "(a) Simple variable updates",
            "(b) wait calls, infinite loops, and blocking calls",
            "(c) Short non-blocking actions",
            "(d) Returning from the function Đáp án đúng: B. wait calls, infinite loops, and blocking calls Giải thích: Ticker callback chạy trong ngữ cảnh interrupt, nên không nên gọi wait, vòng lặp vô hạn hoặc hàm blocking. Nếu ISR bị kẹt quá lâu, các interrupt khác và chương trình chính có thể bị ảnh hưởng."
        ],
        "answerIndex": 0,
        "definition": "(a) Simple variable updates"
    },
    {
        "term": "Which Mbed class is normally used for PWM output?",
        "options": [
            "(a) AnalogIn",
            "(b) Serial",
            "(c) PwmOut",
            "(d) Mutex Đáp án đúng: C. PwmOut Giải thích: PwmOut là class Mbed chuyên dùng để tạo tín hiệu PWM ở chân output hỗ trợ. Nó cho phép cấu hình period, pulse width và duty cycle bằng các hàm API."
        ],
        "answerIndex": 0,
        "definition": "(a) AnalogIn"
    },
    {
        "term": "What does pulsewidth_us(int us) set in the Mbed PWM API?",
        "options": [
            "(a) The ADC resolution in microvolts",
            "(b) The UART baud rate",
            "(c) The semaphore resource count",
            "(d) The PWM pulse width in microseconds Đáp án đúng: D. The PWM pulse width in microseconds Giải thích: pulsewidth_us(int us) đặt độ rộng phần xung ở mức active theo microseconds. Khi kết hợp với period, nó quyết định duty cycle của tín hiệu PWM. Chapter 9: Serial Communication"
        ],
        "answerIndex": 0,
        "definition": "(a) The ADC resolution in microvolts"
    },
    {
        "term": "What is serial communication?",
        "options": [
            "(a) Transmitting data one bit at a time sequentially",
            "(b) Transmitting all bits of a word at the same time on separate wires",
            "(c) Converting analog voltage into a sample",
            "(d) Scheduling real-time threads Đáp án đúng: A. Transmitting data one bit at a time sequentially Giải thích: Serial communication truyền dữ liệu theo từng bit nối tiếp nhau trên đường truyền. Cách này khác với parallel communication, nơi nhiều bit được truyền cùng lúc qua nhiều dây."
        ],
        "answerIndex": 0,
        "definition": "(a) Transmitting data one bit at a time sequentially"
    },
    {
        "term": "Compared with parallel communication, serial communication generally requires:",
        "options": [
            "(a) More separate data wires for every bit",
            "(b) Fewer wires and smaller connectors",
            "(c) No timing parameters",
            "(d) Only analog outputs Đáp án đúng: B. Fewer wires and smaller connectors Giải thích: Serial communication thường cần ít dây hơn nên đầu nối nhỏ hơn, chi phí và trọng lượng thấp hơn. Đây là lợi thế lớn trong hệ thống nhúng và truyền thông khoảng cách dài."
        ],
        "answerIndex": 0,
        "definition": "(a) More separate data wires for every bit"
    },
    {
        "term": "Why can serial communication often be clocked at a higher frequency than parallel communication?",
        "options": [
            "(a) It does not transmit binary data",
            "(b) It never needs conversion overhead",
            "(c) It is less affected by skew and crosstalk between many wires",
            "(d) It always uses an RTOS Đáp án đúng: C. It is less affected by skew and crosstalk between many wires Giải thích: Parallel bus có nhiều dây nên dễ gặp skew clock và nhiễu xuyên âm giữa các đường. Serial dùng ít đường hơn nên tín hiệu ổn định hơn, cho phép tăng clock cao để bù việc truyền từng bit."
        ],
        "answerIndex": 0,
        "definition": "(a) It does not transmit binary data"
    },
    {
        "term": "What is synchronous serial transmission?",
        "options": [
            "(a) Transmission with no timing agreement",
            "(b) Transmission that uses only ASCII characters",
            "(c) Transmission that disables all peripherals",
            "(d) Transmission where sender and receiver share a common clock Đáp án đúng: D. Transmission where sender and receiver share a common clock Giải thích: Synchronous serial transmission dùng clock chung giữa bên gửi và bên nhận. Clock này cho biết thời điểm lấy mẫu bit nên truyền dữ liệu hiệu quả và đồng bộ hơn."
        ],
        "answerIndex": 0,
        "definition": "(a) Transmission with no timing agreement"
    },
    {
        "term": "What is asynchronous serial transmission?",
        "options": [
            "(a) Transmission with no clock wire, using pre-agreed timing parameters",
            "(b) Transmission where every target has a chip-select line",
            "(c) Transmission where all bits are sent in parallel",
            "(d) Transmission that requires a sample-and-hold stage Đáp án đúng: A. Transmission with no clock wire, using pre-agreed timing parameters Giải thích: Asynchronous transmission không truyền dây clock riêng. Hai bên phải thống nhất trước các tham số thời gian như baud rate, sau đó dùng start/stop bit để đồng bộ từng byte."
        ],
        "answerIndex": 0,
        "definition": "(a) Transmission with no clock wire, using pre-agreed timing parameters"
    },
    {
        "term": "What does UART stand for?",
        "options": [
            "(a) Universal Analog Reference Timer",
            "(b) Universal Asynchronous Receiver/Transmitter",
            "(c) Unit Access Register Thread",
            "(d) User Application Real-Time Đáp án đúng: B. Universal Asynchronous Receiver/Transmitter Giải thích: UART là viết tắt của Universal Asynchronous Receiver/Transmitter. Nó là phần cứng chuyển dữ liệu song song trong MCU thành dòng bit nối tiếp và ngược lại mà không cần dây clock."
        ],
        "answerIndex": 0,
        "definition": "(a) Universal Analog Reference Timer"
    },
    {
        "term": "Which UART feature is correct?",
        "options": [
            "(a) It always requires an SCLK line",
            "(b) It is only a four-wire bus",
            "(c) It uses separate transmit and receive wires",
            "(d) It uses chip select for every byte Đáp án đúng: C. It uses separate transmit and receive wires Giải thích: UART thường có hai đường riêng: TX để truyền và RX để nhận. Hai thiết bị phải nối TX của bên này sang RX của bên kia để giao tiếp đúng."
        ],
        "answerIndex": 0,
        "definition": "(a) It always requires an SCLK line"
    },
    {
        "term": "How does a UART byte transfer normally begin?",
        "options": [
            "(a) With a chip-select rising edge only",
            "(b) With a semaphore wait call",
            "(c) With a DAC reference pulse",
            "(d) With a start bit driven low for one clock cycle Đáp án đúng: D. With a start bit driven low for one clock cycle Giải thích: Một frame UART bắt đầu bằng start bit ở mức thấp trong một chu kỳ bit. Cạnh xuống này giúp receiver đồng bộ lại thời điểm lấy mẫu cho các bit dữ liệu tiếp theo."
        ],
        "answerIndex": 0,
        "definition": "(a) With a chip-select rising edge only"
    },
    {
        "term": "What optional bit can UART add to improve transfer reliability?",
        "options": [
            "(a) Parity bit",
            "(b) Capture bit",
            "(c) Mutex bit",
            "(d) Reference bit Đáp án đúng: A. Parity bit Giải thích: Parity bit là bit tùy chọn dùng để kiểm tra lỗi đơn giản. Nó được đặt sao cho tổng số bit 1 là chẵn hoặc lẻ tùy cấu hình parity."
        ],
        "answerIndex": 0,
        "definition": "(a) Parity bit"
    },
    {
        "term": "What is the purpose of the UART stop bit?",
        "options": [
            "(a) To select an SPI target",
            "(b) To frame the end of the transferred data",
            "(c) To update a timer register",
            "(d) To convert UTF-8 into voltage Đáp án đúng: B. To frame the end of the transferred data Giải thích: Stop bit đánh dấu kết thúc frame dữ liệu và đưa đường truyền về trạng thái idle mức cao. Nó cũng tạo khoảng thời gian để receiver chuẩn bị đồng bộ frame tiếp theo."
        ],
        "answerIndex": 0,
        "definition": "(a) To select an SPI target"
    },
    {
        "term": "What does ASCII encode?",
        "options": [
            "(a) Only analog voltage levels",
            "(b) Only PWM duty cycles",
            "(c) 128 characters including printable and control characters",
            "(d) Only RTOS priorities Đáp án đúng: C. 128 characters including printable and control characters Giải thích: ASCII mã hóa 128 ký tự bằng 7 bit, gồm ký tự in được và ký tự điều khiển. Khi gửi text qua UART, các ký tự thường được biểu diễn bằng mã ASCII hoặc encoding tương thích."
        ],
        "answerIndex": 0,
        "definition": "(a) Only analog voltage levels"
    },
    {
        "term": "How many printable characters are included in ASCII according to the material?",
        "options": [
            "(a) 33",
            "(b) 256",
            "(c) 7",
            "(d) 95 Đáp án đúng: D. 95 Giải thích: Theo nội dung slide, ASCII có 95 ký tự in được như chữ cái, chữ số và dấu câu. Ngoài ra còn có các ký tự điều khiển không in như newline, backspace hoặc escape."
        ],
        "answerIndex": 0,
        "definition": "(a) 33"
    },
    {
        "term": "What is UTF-8 described as?",
        "options": [
            "(a) A variable-width encoding scheme compatible with original ASCII",
            "(b) A timer compare mode",
            "(c) A DAC resistor network",
            "(d) An interrupt priority register Đáp án đúng: A. A variable-width encoding scheme compatible with original ASCII Giải thích: UTF-8 là encoding độ dài biến đổi và tương thích với ASCII gốc. Nó được dùng rộng rãi trên web vì hỗ trợ nhiều ngôn ngữ mà vẫn giữ các ký tự ASCII cơ bản giống cũ."
        ],
        "answerIndex": 0,
        "definition": "(a) A variable-width encoding scheme compatible with original ASCII"
    },
    {
        "term": "What is the default Mbed serial setting described as?",
        "options": [
            "(a) 115200 7E2",
            "(b) 9600 8N1",
            "(c) 44.1 kHz 8N1",
            "(d) 2^31-1 8N1 Đáp án đúng: B. 9600 8N1 Giải thích: Mbed serial mặc định là 9600 8N1, nghĩa là baud rate 9600, 8 data bits, no parity và 1 stop bit. Đây là cấu hình phổ biến cho giao tiếp UART cơ bản."
        ],
        "answerIndex": 0,
        "definition": "(a) 115200 7E2"
    },
    {
        "term": "In the notation 9600 8N1, what does N mean?",
        "options": [
            "(a) Nine data bits",
            "(b) Negative logic",
            "(c) No parity",
            "(d) Non-maskable interrupt Đáp án đúng: C. No parity Giải thích: Trong 9600 8N1, chữ N nghĩa là No parity. Điều này cho biết frame không có bit parity để kiểm tra lỗi."
        ],
        "answerIndex": 0,
        "definition": "(a) Nine data bits"
    },
    {
        "term": "What is SPI?",
        "options": [
            "(a) An asynchronous one-wire text encoding",
            "(b) A DAC output stage",
            "(c) A real-time task scheduler",
            "(d) A synchronous four-wire serial bus with controller/target communication Đáp án đúng: D. A synchronous four-wire serial bus with controller/target communication Giải thích: SPI là bus nối tiếp đồng bộ thường dùng 4 dây: SCLK, COTI, CITO và CS. Controller tạo clock và chọn target, sau đó dữ liệu có thể truyền đồng thời hai chiều trên hai đường data."
        ],
        "answerIndex": 0,
        "definition": "(a) An asynchronous one-wire text encoding"
    },
    {
        "term": "Which SPI line carries data from controller to target?",
        "options": [
            "(a) COTI",
            "(b) CITO",
            "(c) CS only",
            "(d) SCLK only Đáp án đúng: A. COTI Giải thích: COTI là Controller Out, Target In, tức dữ liệu đi từ controller đến target. Tên này thay cho MOSI trong cách gọi mới của tài liệu."
        ],
        "answerIndex": 0,
        "definition": "(a) COTI"
    },
    {
        "term": "What is the purpose of the SPI CS line?",
        "options": [
            "(a) To encode ASCII characters",
            "(b) To select the target device for communication",
            "(c) To set PWM pulse width",
            "(d) To restore the exception stack frame Đáp án đúng: B. To select the target device for communication Giải thích: CS là chip select hoặc target select, dùng để chọn thiết bị SPI nào đang giao tiếp. Khi có nhiều target dùng chung SCLK/COTI/CITO, mỗi target thường cần một đường CS riêng."
        ],
        "answerIndex": 0,
        "definition": "(a) To encode ASCII characters"
    },
    {
        "term": "What is I2C?",
        "options": [
            "(a) A parallel communication cable only",
            "(b) A PWM output waveform",
            "(c) A multi-controller serial single-ended computer bus",
            "(d) An ADC quantization method Đáp án đúng: C. A multi-controller serial single-ended computer bus Giải thích: I2C là bus nối tiếp single-ended hỗ trợ nhiều controller và nhiều target. Nó thường dùng cho cảm biến, EEPROM và các chip ngoại vi trên cùng bo mạch."
        ],
        "answerIndex": 0,
        "definition": "(a) A parallel communication cable only"
    },
    {
        "term": "Which two lines are commonly used by I2C?",
        "options": [
            "(a) TX and RX",
            "(b) COTI and CITO",
            "(c) R0 and R1",
            "(d) SCL and SDA Đáp án đúng: D. SCL and SDA Giải thích: I2C dùng hai đường chính là SCL và SDA. SCL là clock, còn SDA là đường dữ liệu hai chiều dùng để truyền địa chỉ, dữ liệu và tín hiệu ACK/NACK. Chapter 10: Real-Time Operating Systems"
        ],
        "answerIndex": 0,
        "definition": "(a) TX and RX"
    },
    {
        "term": "What is an operating system?",
        "options": [
            "(a) An intermediary interface between user applications and computer hardware",
            "(b) A resistor network used by a DAC",
            "(c) A UART start-bit detector",
            "(d) A timer prescaler only Đáp án đúng: A. An intermediary interface between user applications and computer hardware Giải thích: Operating system là lớp trung gian giữa ứng dụng người dùng và phần cứng máy tính. Nó che bớt chi tiết phần cứng để lập trình viên dùng tài nguyên như CPU, bộ nhớ và thiết bị dễ hơn."
        ],
        "answerIndex": 0,
        "definition": "(a) An intermediary interface between user applications and computer hardware"
    },
    {
        "term": "Which function is commonly provided by an operating system?",
        "options": [
            "(a) Increasing ADC quantization error",
            "(b) Managing memory resources",
            "(c) Replacing all hardware drivers with analog signals",
            "(d) Eliminating the need for scheduling Đáp án đúng: B. Managing memory resources Giải thích: Một chức năng quan trọng của OS là quản lý bộ nhớ, bao gồm cấp phát, thu hồi và bảo vệ vùng nhớ cho chương trình. Điều này giúp nhiều chương trình hoặc task chạy ổn định hơn."
        ],
        "answerIndex": 0,
        "definition": "(a) Increasing ADC quantization error"
    },
    {
        "term": "Which item is listed as a basic operating system service?",
        "options": [
            "(a) Generating only triangular waves",
            "(b) Sending only one UART byte",
            "(c) Scheduling tasks",
            "(d) Forcing every interrupt to be non-maskable Đáp án đúng: C. Scheduling tasks Giải thích: Scheduling tasks là dịch vụ cơ bản của OS vì CPU thường chỉ chạy một tác vụ tại một thời điểm trên một core. Scheduler quyết định task nào được chạy, khi nào chuyển task và theo quy tắc ưu tiên nào."
        ],
        "answerIndex": 0,
        "definition": "(a) Generating only triangular waves"
    },
    {
        "term": "What is a single-user OS?",
        "options": [
            "(a) An OS that requires many CPUs",
            "(b) An OS that cannot run programs",
            "(c) An OS used only for SPI targets",
            "(d) An OS that allows only one user to access it Đáp án đúng: D. An OS that allows only one user to access it Giải thích: Single-user OS chỉ cho một người dùng truy cập hệ thống tại một thời điểm. Nó vẫn có thể chạy nhiều chương trình, nhưng quyền truy cập người dùng không đồng thời như multi-user OS."
        ],
        "answerIndex": 0,
        "definition": "(a) An OS that requires many CPUs"
    },
    {
        "term": "What is a multi-user OS?",
        "options": [
            "(a) An OS that allows multiple users to access it at the same time",
            "(b) An OS that supports only one program",
            "(c) An OS that only controls DAC outputs",
            "(d) An OS with no task scheduling Đáp án đúng: A. An OS that allows multiple users to access it at the same time Giải thích: Multi-user OS cho nhiều người dùng truy cập hệ thống cùng lúc. Hệ điều hành phải quản lý tài nguyên, bảo mật và phân chia thời gian xử lý cho nhiều phiên làm việc."
        ],
        "answerIndex": 0,
        "definition": "(a) An OS that allows multiple users to access it at the same time"
    },
    {
        "term": "What is the purpose of a batch operating system?",
        "options": [
            "(a) To reduce ADC resolution",
            "(b) To run similar offline-submitted jobs as a group and maximize processor usage",
            "(c) To transmit every bit in parallel",
            "(d) To disable all file systems Đáp án đúng: B. To run similar offline-submitted jobs as a group and maximize processor usage Giải thích: Batch OS gom các job tương tự được chuẩn bị offline rồi chạy theo nhóm. Mục tiêu là tăng hiệu suất sử dụng processor bằng cách giảm tương tác trực tiếp trong lúc xử lý."
        ],
        "answerIndex": 0,
        "definition": "(a) To reduce ADC resolution"
    },
    {
        "term": "What is an embedded OS designed for?",
        "options": [
            "(a) Only desktop video editing",
            "(b) Only cloud storage systems",
            "(c) Embedded computer systems with limited resources",
            "(d) Only UART text encoding Đáp án đúng: C. Embedded computer systems with limited resources Giải thích: Embedded OS được thiết kế cho hệ thống nhúng có bộ nhớ, IO và tốc độ clock hạn chế. Nó thường nhỏ gọn, tiết kiệm năng lượng và tập trung vào tương tác phần cứng."
        ],
        "answerIndex": 0,
        "definition": "(a) Only desktop video editing"
    },
    {
        "term": "What is the key goal of an RTOS?",
        "options": [
            "(a) Maximum graphical user interface effects",
            "(b) The highest possible average throughput only",
            "(c) Eliminating all interrupts",
            "(d) Guaranteed and predictable response within defined timing constraints Đáp án đúng: D. Guaranteed and predictable response within defined timing constraints Giải thích: RTOS ưu tiên phản hồi trong khoảng thời gian xác định và có thể dự đoán. Mục tiêu chính không phải lúc nào cũng là throughput cao nhất, mà là đảm bảo deadline của tác vụ thời gian thực."
        ],
        "answerIndex": 0,
        "definition": "(a) Maximum graphical user interface effects"
    },
    {
        "term": "What does real-time mean in the RTOS context?",
        "options": [
            "(a) Completion of a process within a defined time interval",
            "(b) Execution that is always the fastest possible",
            "(c) Operation with no deadlines",
            "(d) Using only analog input Đáp án đúng: A. Completion of a process within a defined time interval Giải thích: Real-time nghĩa là tiến trình phải hoàn thành trong một khoảng thời gian đã định. Nó không nhất thiết là nhanh nhất; một tác vụ chậm nhưng luôn đúng hạn vẫn có tính real-time."
        ],
        "answerIndex": 0,
        "definition": "(a) Completion of a process within a defined time interval"
    },
    {
        "term": "What is jitter?",
        "options": [
            "(a) The voltage range of a DAC",
            "(b) The variability of the time it takes to complete a task",
            "(c) The number of UART stop bits",
            "(d) The resolution of an ADC Đáp án đúng: B. The variability of the time it takes to complete a task Giải thích: Jitter là độ biến thiên của thời gian hoàn thành tác vụ giữa các lần chạy. RTOS tốt thường cố giảm jitter để hành vi hệ thống ổn định và dự đoán được."
        ],
        "answerIndex": 0,
        "definition": "(a) The voltage range of a DAC"
    },
    {
        "term": "Which RTOS type can meet deadlines deterministically with less jitter?",
        "options": [
            "(a) Soft RTOS",
            "(b) Batch OS",
            "(c) Hard RTOS",
            "(d) Single-user OS Đáp án đúng: C. Hard RTOS Giải thích: Hard RTOS yêu cầu đáp ứng deadline một cách xác định với jitter thấp. Nếu trễ deadline, hệ thống có thể gây hậu quả nghiêm trọng, nên tính đảm bảo thời gian là bắt buộc."
        ],
        "answerIndex": 0,
        "definition": "(a) Soft RTOS"
    },
    {
        "term": "What is an event-driven RTOS design commonly associated with?",
        "options": [
            "(a) No priority handling at all",
            "(b) Only file management",
            "(c) Only analog sampling",
            "(d) Pre-emptive task scheduling based on priority events Đáp án đúng: D. Pre-emptive task scheduling based on priority events Giải thích: Event-driven RTOS thường dùng pre-emptive scheduling, trong đó sự kiện hoặc task ưu tiên cao có thể ngắt task ưu tiên thấp. Cách này giúp hệ thống phản hồi nhanh với sự kiện quan trọng."
        ],
        "answerIndex": 0,
        "definition": "(a) No priority handling at all"
    },
    {
        "term": "What is a time-sharing RTOS design commonly associated with?",
        "options": [
            "(a) Non-pre-emptive task switching on regular clocked interrupts or events",
            "(b) Permanent execution of one task only",
            "(c) No scheduling overhead",
            "(d) ADC range selection Đáp án đúng: A. Non-pre-emptive task switching on regular clocked interrupts or events Giải thích: Time-sharing RTOS thường chuyển task theo tick thời gian định kỳ hoặc sự kiện, có thể theo kiểu round-robin. Cách này tạo cảm giác đa nhiệm mượt hơn nhưng có overhead do chuyển task thường xuyên."
        ],
        "answerIndex": 0,
        "definition": "(a) Non-pre-emptive task switching on regular clocked interrupts or events"
    },
    {
        "term": "Which task state means the task is currently executed by the CPU?",
        "options": [
            "(a) Ready",
            "(b) Running",
            "(c) Blocked",
            "(d) Inactive Đáp án đúng: B. Running Giải thích: Running là trạng thái task đang thật sự được CPU thực thi. Trên một CPU đơn nhân, tại một thời điểm thường chỉ có một task ở trạng thái Running."
        ],
        "answerIndex": 0,
        "definition": "(a) Ready"
    },
    {
        "term": "Which task state means the task is paused and waiting for an event such as I/O?",
        "options": [
            "(a) Running",
            "(b) Ready",
            "(c) Blocked",
            "(d) Terminated only Đáp án đúng: C. Blocked Giải thích: Blocked nghĩa là task tạm dừng vì đang chờ sự kiện, ví dụ I/O hoàn thành, semaphore được release hoặc timeout. Task blocked chưa thể chạy cho đến khi điều kiện chờ được thỏa mãn."
        ],
        "answerIndex": 0,
        "definition": "(a) Running"
    },
    {
        "term": "What is pre-emptive scheduling?",
        "options": [
            "(a) Tasks must voluntarily end themselves only",
            "(b) Tasks are never switched",
            "(c) Tasks are converted to analog signals",
            "(d) Tasks can be interrupted by other tasks with higher priorities Đáp án đúng: D. Tasks can be interrupted by other tasks with higher priorities Giải thích: Pre-emptive scheduling cho phép task ưu tiên cao ngắt task đang chạy có ưu tiên thấp hơn. Điều này rất quan trọng trong RTOS vì sự kiện quan trọng phải được phục vụ trong deadline."
        ],
        "answerIndex": 0,
        "definition": "(a) Tasks must voluntarily end themselves only"
    },
    {
        "term": "Which API standard is the foundation of official Mbed RTOS?",
        "options": [
            "(a) CMSIS-RTOS API",
            "(b) ASCII API",
            "(c) PWM-DAC API",
            "(d) UART-ADC API Đáp án đúng: A. CMSIS-RTOS API Giải thích: CMSIS-RTOS API là nền tảng chuẩn cho Mbed RTOS. Nó cung cấp giao diện lập trình chung giúp code có tính portable giữa các RTOS hỗ trợ chuẩn CMSIS."
        ],
        "answerIndex": 0,
        "definition": "(a) CMSIS-RTOS API"
    },
    {
        "term": "In Mbed RTOS, which thread state describes threads ready to run but not currently running?",
        "options": [
            "(a) Running",
            "(b) Ready",
            "(c) Inactive",
            "(d) Locked Đáp án đúng: B. Ready Giải thích: Ready là trạng thái thread đã sẵn sàng chạy nhưng chưa được CPU chọn. Khi thread đang Running kết thúc hoặc vào Waiting, scheduler sẽ chọn thread Ready có priority phù hợp để chạy."
        ],
        "answerIndex": 0,
        "definition": "(a) Running"
    },
    {
        "term": "What is a mutex used for?",
        "options": [
            "(a) Increasing UART baud rate",
            "(b) Generating a DAC output voltage",
            "(c) Ensuring no two threads enter a critical section for a shared resource at the same time",
            "(d) Selecting an SPI target Đáp án đúng: C. Ensuring no two threads enter a critical section for a shared resource at the same time Giải thích: Mutex bảo vệ tài nguyên dùng chung bằng cách chỉ cho một thread vào critical section tại một thời điểm. Nhờ đó tránh việc hai thread cùng sửa dữ liệu gây race condition hoặc dữ liệu không nhất quán."
        ],
        "answerIndex": 0,
        "definition": "(a) Increasing UART baud rate"
    },
    {
        "term": "How is a semaphore different from a mutex according to the material?",
        "options": [
            "(a) A semaphore always has exactly one owner",
            "(b) A semaphore is only used for analog sampling",
            "(c) A semaphore replaces all threads",
            "(d) A semaphore has no owner and can control access to several shared resources Đáp án đúng: D. A semaphore has no owner and can control access to several shared resources Giải thích: Semaphore khác mutex ở chỗ nó không có chủ sở hữu cố định và có thể dùng để quản lý nhiều tài nguyên giống nhau. Semaphore count cho biết còn bao nhiêu tài nguyên hoặc tín hiệu đang khả dụng. Quick Answer Key This table is only a quick reference. Detailed Vietnamese explanations are included directly below each question. Chapter 6 No. Chapter Answer Question Topic 1 6 A What is an interrupt in a microcontroller system? 2 6 B Why are interrupts usually preferred over polling for detecting a switch pr... 3 6 C Which statement best describes polling? 4 6 D In the example system, what happens when switch SW is pressed? 5 6 A During exception entry on Arm Cortex-M, which action is performed by hardwi... 6 6 B Which registers are part of the basic exception stack frame on Cortex-M? 7 6 C What happens to the processor mode when an exception handler starts executi... 8 6 D What does the IPSR contain during exception handling? 9 6 A Why can vectors in the vector table appear as odd addresses? 10 6 B What information does an EXC_RETURN value provide? 11 6 C Which EXC_RETURN value represents returning to Thread mode using MSP? 12 6 D What is the role of the NVIC? 13 6 A What does it mean when an interrupt is pending? 14 6 B Which CMSIS function enables an IRQ? 15 6 C What is PRIMASK mainly used for? 16 6 D In exception prioritization, which priority number represents higher priori... 17 6 A What is interrupt latency? 18 6 B According to the simplified maximum interrupt rate model, what happens when... 19 6 C Why should some shared variables be declared volatile? 20 6 D What is a race condition? Chapter 7 No. Chapter Answer Question Topic 21 7 A Why do processors need ADCs and DACs when working with real-world signals? 22 7 B What is the main function of an Analog-to-Digital Converter (ADC)? 23 7 C What is the main function of a Digital-to-Analog Converter (DAC)? 24 7 D Which stage keeps the analog signal constant during ADC conversion? 25 7 A Why is a multiplexer often used before an ADC? 26 7 B For an n-bit DAC, why does the maximum output not normally reach the refere... 27 7 C What analog output range is shown for a 3-bit DAC triangular wave example? 28 7 D Which ADC type compares input voltage with many reference levels? 29 7 A Which ADC type converts voltage into capacitor charge time? 30 7 B What does ADC resolution describe? 31 7 C How many discrete values does an 8-bit ADC ideally provide? 32 7 D For an 8-bit ADC with a 10 V range, what is the approximate LSB voltage? 33 7 A What is quantization error? 34 7 B According to the Shannon-Nyquist theorem, the sampling frequency must be at... 35 7 C What can happen if the sampling frequency is too low? 36 7 D Which Mbed class is used for analog input? 37 7 A Which Mbed class is used for analog output? 38 7 B In the Mbed AnalogIn API, what does read() return? 39 7 C In the Mbed AnalogIn API, what does read_u16() return? 40 7 D What is a typical application of a DAC mentioned in the material? Chapter 8 No. Chapter Answer Question Topic 41 8 A What is a hardware timer? 42 8 B What usually happens when a hardware timer reaches zero or a predefined val... 43 8 C Compared with a hardware timer, a software timer usually has: 44 8 D What is the function of a timer prescaler? 45 8 A What is the timer register driven by? 46 8 B What does a capture register do? 47 8 C What does a compare register do? 48 8 D Which timer mode is mainly used to create a customized clock or periodic in... 49 8 A Which timer mode is especially useful for measuring time intervals between ... 50 8 B What does PWM stand for? 51 8 C In PWM, what does duty cycle describe? 52 8 D What is PWM mainly used to control? 53 8 A In the PWM example, how can a 50% power output be generated? 54 8 B Which Mbed Timer function starts a timer? 55 8 C Which Mbed Timer function returns elapsed time in seconds? 56 8 D What limitation is noted for Mbed timers based on 32-bit microsecond counte... 57 8 A What is a Ticker in Mbed? 58 8 B What should be avoided inside a ticker ISR? 59 8 C Which Mbed class is normally used for PWM output? 60 8 D What does pulsewidth_us(int us) set in the Mbed PWM API? Chapter 9 No. Chapter Answer Question Topic 61 9 A What is serial communication? 62 9 B Compared with parallel communication, serial communication generally requir... 63 9 C Why can serial communication often be clocked at a higher frequency than pa... 64 9 D What is synchronous serial transmission? 65 9 A What is asynchronous serial transmission? 66 9 B What does UART stand for? 67 9 C Which UART feature is correct? 68 9 D How does a UART byte transfer normally begin? 69 9 A What optional bit can UART add to improve transfer reliability? 70 9 B What is the purpose of the UART stop bit? 71 9 C What does ASCII encode? 72 9 D How many printable characters are included in ASCII according to the materi... 73 9 A What is UTF-8 described as? 74 9 B What is the default Mbed serial setting described as? 75 9 C In the notation 9600 8N1, what does N mean? 76 9 D What is SPI? 77 9 A Which SPI line carries data from controller to target? 78 9 B What is the purpose of the SPI CS line? 79 9 C What is I2C? 80 9 D Which two lines are commonly used by I2C? Chapter 10 No. Chapter Answer Question Topic 81 10 A What is an operating system? 82 10 B Which function is commonly provided by an operating system? 83 10 C Which item is listed as a basic operating system service? 84 10 D What is a single-user OS? 85 10 A What is a multi-user OS? 86 10 B What is the purpose of a batch operating system? 87 10 C What is an embedded OS designed for? 88 10 D What is the key goal of an RTOS? 89 10 A What does real-time mean in the RTOS context? 90 10 B What is jitter? 91 10 C Which RTOS type can meet deadlines deterministically with less jitter? 92 10 D What is an event-driven RTOS design commonly associated with? 93 10 A What is a time-sharing RTOS design commonly associated with? 94 10 B Which task state means the task is currently executed by the CPU? 95 10 C Which task state means the task is paused and waiting for an event such as ... 96 10 D What is pre-emptive scheduling? 97 10 A Which API standard is the foundation of official Mbed RTOS? 98 10 B In Mbed RTOS, which thread state describes threads ready to run but not cur... 99 10 C What is a mutex used for? 100 10 D How is a semaphore different from a mutex according to the material?"
        ],
        "answerIndex": 0,
        "definition": "(a) A semaphore always has exactly one owner"
    }
];