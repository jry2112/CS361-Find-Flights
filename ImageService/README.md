# Image Generator

### Instructions
1) Run on desired localhost port (default is 3000)
2) navigate to http://localhost:3000/api/v1/images/<keyword>
    Examples: http://localhost:3000/api/v1/images/apple; http://localhost:3000/api/v1/images/apple%20pie
3) Access results:
Response body includes a JSON object containing the top 10 results for a given search term

    Example:

    {"urls":
        ["https://images.unsplash.com/photo-1568571780765-9276ac8b75a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&     ixid=MnwzMDE2NTB8MHwxfHNlYXJjaHwxfHxhcHBsZSUyMHBpZXxlbnwwfHx8fDE2NDU0OTA1NTI&ixlib=rb-1.2.1&q=80&w=1080",
        "https://images.unsplash.com/photo-1562007908-17c67e878c88?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzMDE2NTB8MHwxfHNlYXJjaHwyfHxhcHBsZSUyMHBpZXxlbnwwfHx8fDE2NDU0OTA1NTI&ixlib=rb-1.2.1&q=80&w=1080",
    ..."
    ]}
