# 🚀 Setup & Testing Guide - Mocemilanko Order Management System

## Installation & Setup

### 1. **No Additional Dependencies Required**
The implementation uses only existing packages:
- ✅ `next` - Already installed
- ✅ `react` - Already installed
- ✅ `framer-motion` - Already installed
- ✅ `typescript` - Already installed

### 2. **Start Development Server**
```bash
npm run dev
```

The server will automatically create the `/data` directory and `orders.json` file on first order.

---

## 📋 Quick Testing Checklist

### Test 1: Place a Test Order
1. Open `http://localhost:3000`
2. Click on a product (e.g., "Basreng Pedas")
3. Select a flavor
4. Click "Tambah ke Keranjang"
5. Click the cart icon (🛒)
6. Click "Lanjut ke Checkout"
7. Fill in the form:
   - Nama: "Test User"
   - WhatsApp: "6282145661716"
   - Alamat: "Jl. Test No. 123"
   - Catatan: "Jangan terlalu pedas"
8. Click "Lanjut ke Struk"
9. **Verify:** Receipt modal appears with Order ID and Receipt Number
10. Click "Kirim via WhatsApp"
11. **Note:** WhatsApp will open - don't click it yet (order is already saved)
12. Go to `http://localhost:3000/order-history`

### Test 2: Verify Order in History
1. Open `http://localhost:3000/order-history`
2. **Verify:** Your test order appears in the list
3. **Check:** Order details show:
   - Order ID (MC-XXXXXX)
   - Customer name
   - Products ordered
   - Total price
   - Status badge
4. Click "Lihat Detail"

### Test 3: View Order Details
1. **Verify:** Order detail page shows all information:
   - ✅ Customer information (name, WhatsApp, address)
   - ✅ All items with flavors and quantities
   - ✅ Receipt number
   - ✅ Order timestamps
   - ✅ Status badge
2. **Test buttons:**
   - Click "📥 Download PDF" → Receipt should open for print/download
   - Click "🖨️ Cetak" → Print dialog should open
   - Click "💬 Hubungi via WhatsApp" → WhatsApp opens with order reference

### Test 4: Admin Dashboard
1. Open `http://localhost:3000/admin`
2. **Verify:** Dashboard displays:
   - ✅ Total Orders count
   - ✅ Total Revenue amount
   - ✅ Most Ordered Product
   - ✅ Orders Today count
3. **Verify:** Recent orders list shows your test order
4. Click on an order to see details in sidebar
5. Click "Lihat Semua Pesanan" to go to full order history

### Test 5: Search & Filter (Order History)
1. Go to `http://localhost:3000/order-history`
2. **Test search:**
   - Search by Order ID: Type "MC-" to find orders
   - Search by Name: Type "Test" to find your test order
   - Search by WhatsApp: Paste the number
3. **Test filters:**
   - Filter by Status: Select "Pending", "Confirmed", etc.
   - Filter by date range: Set start and end dates
   - Sort order: Toggle between "Terbaru" and "Terlama"

### Test 6: Multiple Orders
1. Place 3-4 more test orders with different:
   - Product combinations
   - Flavors
   - Customer names (if desired)
2. **Verify:**
   - All orders appear in history
   - Statistics update (total count, revenue)
   - Filter and search work across multiple orders

### Test 7: Order Status Updates
1. Go to an order detail page
2. In the sidebar, change the status dropdown
3. Select a different status (e.g., "Confirmed")
4. **Verify:**
   - Status updates in real-time
   - Status displays correctly on order history
   - Status change is saved

---

## 🔍 Debugging Tips

### If orders don't save:
1. Check browser console for errors (F12)
2. Check server logs (terminal where `npm run dev` runs)
3. Verify `/data/orders.json` exists in project root
4. Check file permissions on `/data` folder

### If pages don't load:
1. Verify all imports are correct
2. Check Next.js compile errors in terminal
3. Verify OrderProvider is wrapped in layout.tsx
4. Check browser console for client-side errors

### If API endpoints fail:
1. Open browser Developer Tools → Network tab
2. Trigger an action (place order, search, etc.)
3. Look for requests to `/api/orders/*`
4. Check response status and error messages
5. Verify database.ts functions are correct

---

## 📊 Expected Database Structure

After first order, check `/data/orders.json`:

```json
[
  {
    "id": "abc123xyz",
    "orderId": "MC-123456",
    "receiptNumber": "MC2401011234",
    "customerName": "Test User",
    "whatsappNumber": "6282145661716",
    "address": "Jl. Test No. 123",
    "notes": "Jangan terlalu pedas",
    "items": [
      {
        "productId": "basreng",
        "productName": "Basreng Pedas",
        "flavor": "Pedas Extra",
        "quantity": 2,
        "price": 25000,
        "totalPrice": 50000
      }
    ],
    "totalPrice": 50000,
    "status": "Pending",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
]
```

---

## 🔐 Important Notes

### Data Persistence
- ✅ Orders stored in `/data/orders.json`
- ✅ Survives server restarts
- ✅ No data loss on WhatsApp redirect
- ⚠️ File-based storage (suitable for MVP, consider DB for production)

### Backup Recommendations
```bash
# Backup orders regularly
cp data/orders.json data/orders.backup.json

# For production, consider:
# - MongoDB
# - PostgreSQL
# - Firebase/Supabase
# - AWS DynamoDB
```

### Security Considerations
- Currently no authentication for admin dashboard
- For production, add:
  - Admin login system
  - Password protection
  - Access control
  - Data encryption

---

## ✨ Features Working

✅ Create orders with customer info
✅ Generate unique Order IDs & Receipt Numbers
✅ Save receipts permanently
✅ View order history
✅ Search orders (ID, name, WhatsApp)
✅ Filter by status and date
✅ Download receipt as PDF
✅ Print receipts
✅ Contact via WhatsApp from detail page
✅ Admin dashboard with statistics
✅ Update order status
✅ Mobile responsive design
✅ All animations working
✅ Original Mocemilanko branding preserved

---

## 🎯 Next Steps

### Immediate (Optional):
- [ ] Test all features thoroughly
- [ ] Create backups of orders
- [ ] Verify mobile responsiveness
- [ ] Test WhatsApp linking

### Short-term (Future Enhancements):
- [ ] Integrate real database
- [ ] Add email/SMS notifications
- [ ] Implement user login
- [ ] Add payment gateway
- [ ] Create customer account page

### Long-term (Production):
- [ ] Migrate to production database
- [ ] Implement proper authentication
- [ ] Add analytics dashboard
- [ ] Set up automated backups
- [ ] Implement security measures
- [ ] Add multi-language support

---

## 📞 Support

If you encounter any issues:

1. **Check logs:** Look at browser console and terminal logs
2. **Verify setup:** Run through Quick Testing Checklist
3. **Check files:** Ensure all new files are created correctly
4. **Clear cache:** Try `npm run build` and restart `npm run dev`

---

## 🎉 You're All Set!

The Order History and Digital Receipt Management System is now fully integrated with your Mocemilanko website!

**Key URLs to remember:**
- 🛍️ Homepage: `http://localhost:3000`
- 📋 Order History: `http://localhost:3000/order-history`
- 📄 Order Details: `http://localhost:3000/order-history/[order-id]`
- 📊 Admin Dashboard: `http://localhost:3000/admin`

Happy ordering! 🌶️🧀🌽
