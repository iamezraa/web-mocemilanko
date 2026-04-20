<<<<<<< HEAD
# 🌶️ Mocemilanko - Cemilan Seru untuk Semua Mood

Mocemilanko adalah website resmi brand snack yang menghadirkan berbagai pilihan rasa dengan identitas visual yang fun, colorful, dan playful.

## 🎨 Fitur Utama

✨ **Desain Modern & Playful**
- Gradien warna-warni yang vibrant
- Animasi smooth dengan Framer Motion
- Mobile-first responsive design
- Interactive hover effects yang seru

🎯 **Showcase Lengkap**
- Hero section dengan floating animated elements
- Flavor Experience section dengan interactive selector
- Product showcase grid dengan 7+ varian rasa
- About section dengan brand story
- How to order dengan langkah-langkah berbeda
- Testimonial dari pelanggan puas
- Strong CTA section dengan call-to-action

🔔 **WhatsApp Integration**
- Semua tombol pesan langsung ke WhatsApp
- Auto-generated message sesuai flavor pilihan
- Easy ordering process tanpa checkout system

📱 **Mobile-First**
- Fully responsive di semua ukuran layar
- Optimized untuk mobile experience
- Touch-friendly interactive elements

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (React)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Build**: Optimized with App Router

## 🚀 Cara Menggunakan

### Development Server

```bash
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) untuk melihat hasilnya.

### Build untuk Production

```bash
npm run build
npm start
```

### Linting

```bash
npm run lint
```

## 📁 Struktur Project

```
src/
├── app/
│   ├── layout.tsx          # Root layout dengan metadata
│   ├── page.tsx            # Main page yang import semua components
│   └── globals.css         # Global styles
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section dengan floating elements
│   ├── FlavorExperience.tsx    # Interactive flavor selector
│   ├── ProductShowcase.tsx    # Product grid
│   ├── About.tsx           # Brand story & values
│   ├── HowToOrder.tsx      # Ordering steps
│   ├── Testimonials.tsx    # Customer reviews
│   ├── CTA.tsx             # Call to action section
│   ├── Footer.tsx          # Footer dengan contact info
│   └── WhatsAppButton.tsx  # Reusable WhatsApp button
```

## 🎨 Warna Brand

- **Spicy Basreng**: Red (#DC2626) & Orange (#EA580C)
- **Balado**: Deep Red (#991B1B)
- **Chicken Onion**: Yellow (#FBBF24) & Brown (#D2691E)
- **Original (Salty)**: Cream (#F5F1E8) & Beige (#E8DCC8)
- **Barbeque**: Brown (#5C4033) & Orange (#FF8C42)
- **Cheese**: Bright Yellow (#FFD700)
- **Roasted Corn**: Yellow (#FEB139) & Green (#84CC16)

## 📦 Product Lineup

1. **Basreng** 🍟 - Fried meatball dengan rasa pedas
2. **Mie Lidi Balado** 🔴 - Traditional Balao flavor
3. **Mie Lidi Ayam Bawang** 🧅 - Chicken Onion
4. **Mie Lidi Original** ✨ - Classic Salty
5. **Mie Lidi Barbeque** 🔥 - BBQ flavor
6. **Mie Lidi Keju** 🧀 - Cheese
7. **Mie Lidi Jagung Bakar** 🌽 - Roasted Corn

## 🌐 Kontak

- **WhatsApp**: [Hubungi Kami](https://wa.me/628123456789)
- **Email**: hello@mocemilanko.com
- **Instagram**: [@mocemilanko](https://instagram.com/mocemilanko)
- **TikTok**: [@mocemilanko](https://tiktok.com/@mocemilanko)
- **Lokasi**: Jakarta, Indonesia

## 💡 Extra Features

Beberapa fitur bonus yang telah diimplementasikan:

- ✅ Smooth scroll navigation
- ✅ Animated flavor cards dengan color changes
- ✅ Mobile-responsive testimonials carousel
- ✅ Floating animated snack elements di hero
- ✅ Interactive product hover effects
- ✅ Gradient backgrounds yang vibrant
- ✅ Auto-generated WhatsApp messages
- ✅ Trust badges & stats
- ✅ FAQ mini section
- ✅ Social media integration

## 🔄 Customization

### Mengubah Nomor WhatsApp
Edit file `/src/components/WhatsAppButton.tsx` dan ubah nomor di function `getWhatsAppLink`:
```typescript
return `https://wa.me/628123456789?text=${encodedMessage}`;
```

### Mengubah Warna Brand
Edit file `/tailwind.config.ts` dan ubah color palette sesuai kebutuhan.

### Menambah Product/Flavor Baru
Edit array di file `/src/components/ProductShowcase.tsx` atau `/src/components/FlavorExperience.tsx`.

## 📱 Deployment

Project ini siap untuk di-deploy ke:
- **Vercel** (recommended untuk Next.js)
- **Netlify**
- **AWS Amplify**
- **Self-hosted server**

### Deploy ke Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

## 🎯 Future Enhancements

- [ ] Admin dashboard untuk manage products
- [ ] Customer login & order history
- [ ] Payment gateway integration
- [ ] Blog section untuk tips & recipes
- [ ] Daily deals & promotion system
- [ ] Email newsletter subscription
- [ ] Product reviews system
- [ ] Loyalty program

## 📄 License

Proprietary - Mocemilanko Brand

---

**Made with ❤️ untuk para pecinta cemilan lezat** 🌶️🧀🌽

Banyak Rasa, Banyak Cerita!
=======
# web-mocemilanko
>>>>>>> d7785dba6ccc2827d82f543a4991b117eb911170
