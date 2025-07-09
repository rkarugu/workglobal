<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Payment Receipt</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 20px;
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .receipt-title {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
        }
        .company-info {
            margin-bottom: 30px;
            text-align: left;
        }
        .receipt-details {
            margin-bottom: 30px;
        }
        .receipt-details table {
            width: 100%;
            border-collapse: collapse;
        }
        .receipt-details th, .receipt-details td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
            text-align: left;
        }
        .receipt-details th {
            background-color: #f8f9fa;
        }
        .footer {
            margin-top: 50px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
        .amount {
            font-size: 18px;
            font-weight: bold;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="receipt-title">Payment Receipt</h1>
        <p>{{ $company['name'] }}</p>
    </div>

    <div class="company-info">
        {{ $company['address'] }}<br>
        Phone: {{ $company['phone'] }}<br>
        Email: {{ $company['email'] }}
    </div>

    <div class="receipt-details">
        <table>
            <tr>
                <th>Receipt Details</th>
                <th></th>
            </tr>
            <tr>
                <td>Receipt Number:</td>
                <td>#{{ str_pad($payment->id, 6, '0', STR_PAD_LEFT) }}</td>
            </tr>
            <tr>
                <td>Date:</td>
                <td>{{ $payment->verified_at ? $payment->verified_at->format('F j, Y') : now()->format('F j, Y') }}</td>
            </tr>
            <tr>
                <td>Customer Name:</td>
                <td>{{ $payment->name }}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>{{ $payment->email }}</td>
            </tr>
            <tr>
                <td>Phone:</td>
                <td>{{ $payment->phone }}</td>
            </tr>
            <tr>
                <td>M-Pesa Code:</td>
                <td>{{ $payment->mpesa_code }}</td>
            </tr>
            <tr>
                <td>Reference:</td>
                <td>{{ $payment->reference }}</td>
            </tr>
            <tr>
                <td>Amount:</td>
                <td class="amount">KES {{ number_format($payment->amount, 2) }}</td>
            </tr>
        </table>
    </div>

    <div class="footer">
        <p>Thank you for your payment. This is an official receipt from {{ $company['name'] }}.</p>
        <p>For any queries, please contact us at {{ $company['email'] }}.</p>
    </div>
</body>
</html> 