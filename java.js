// =========================================
// PROJECT 6 JAWA.js - KODE FINAL & BERSIH 100%
// =========================================

// =========================================
// 0. WELCOME SCREEN, WAITING LOADING & DAILY MUSIC 🎵📅
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-btn');
    const welcomeInitial = document.getElementById('welcome-initial');
    const welcomeLoader = document.getElementById('welcome-loader');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const audio = document.querySelector('audio');

    // 🌟 JURUS BARU: DAFTAR LAGU BERDASARKAN HARI
    // 0 = Minggu, 1 = Senin, 2 = Selasa, 3 = Rabu, 4 = Kamis, 5 = Jumat, 6 = Sabtu
    const daftarLagu = {
        0: "morning.mp3", 
        1: "tujuhbelas.mp3", // Senin
        2: "laskar pelangi.mp3", // Selasa
        3: "Remaja.mp3", // Rabu
        4: "untukku.mp3", // Kamis
        5: "kita ke sana.mp3", // Jumat
        6: "satu satunya.mp3"  // Sabtu
    };

    // Deteksi hari apa sekarang dan ganti lagunya secara otomatis!
    if (audio) {
        const hariIni = new Date().getDay(); 
        audio.src = daftarLagu[hariIni];
    }

    if (enterBtn && welcomeScreen) {
        enterBtn.addEventListener('click', () => {
            // 1. Putar musik langsung saat diklik
            if (audio) {
                audio.play().catch(error => console.log("Audio ditahan browser: ", error));
            }

            // 2. Sembunyikan tombol "Masuk", lalu munculkan tampilan Waiting / Loading
            if (welcomeInitial) welcomeInitial.style.display = 'none';
            if (welcomeLoader) welcomeLoader.style.display = 'block';

            // 3. Jalankan efek hitungan persentase 0% -> 100% (DURASI 3-4 DETIK)
            let percent = 0;
            const loadingInterval = setInterval(() => {
                percent += Math.floor(Math.random() * 1 + 30 & 50);

                if (percent >= 100) {
                    percent = 100;
                    clearInterval(loadingInterval);

                    if (progressBar) progressBar.style.width = '100%';
                    if (progressText) progressText.innerText = '100%';

                    // 4. Tahan selama 1 DETIK PENUH di angka 100% biar mantap
                    setTimeout(() => {
                        welcomeScreen.classList.add('hidden');
                        setTimeout(() => {
                            welcomeScreen.style.display = 'none';
                        }, 1000);
                    }, 1000); 
                } else {
                    if (progressBar) progressBar.style.width = percent + '%';
                    if (progressText) progressText.innerText = percent + '%';
                }
            }, 50); 
        });
    }
});

  // 1. SCRIPT TRANSISI MENU HALAMAN (DENGAN POP-UP PERINGATAN WAJIB "OKE")
document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const pageIds = ['beranda', 'tentang', 'pengurus', 'anggota', 'jadwal', 'piket', 'galeri', 'media', 'pesan', 'rahasia'];

    // Elemen Pop-up Peringatan
    const pageAlertModal = document.getElementById('pageAlertModal');
    const pageAlertMessage = document.getElementById('pageAlertMessage');
    const btnPageAlertOk = document.getElementById('btnPageAlertOk');

    function switchPage(targetId) {
        // Menyembunyikan semua halaman
        pageIds.forEach(id => {
            const section = document.getElementById(id);
            if (section) section.classList.remove('active-page');
        });
        
        // Memunculkan halaman yang dituju
        const targetSection = document.getElementById(targetId);
        if (targetSection) targetSection.classList.add('active-page');
        
        // Saklar Cahaya Menu
        navLinks.forEach(link => {
            link.classList.remove('active-nav'); 
            if (link.getAttribute('href') === `#${targetId}`) {
                link.classList.add('active-nav');
            }
        });
        
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // 🌟 JURUS POP-UP SAAT MASUK HALAMAN TERTENTU
        setTimeout(() => {
            if (targetId === 'galeri') {
                if (pageAlertModal && pageAlertMessage) {
                    pageAlertMessage.innerHTML = "<strong>Halo pengunjung!</strong><br>Selamat datang di halaman Galeri 📸.<br>Harap tidak meng-SS dan menyebarkan foto-foto ini yaa, terima kasih 🙏";
                    pageAlertModal.style.display = 'flex';
                    setTimeout(() => { pageAlertModal.style.opacity = '1'; }, 10);
                    pageAlertModal.classList.add('active');
                }
            } 
            else if (targetId === 'pesan') {
                if (pageAlertModal && pageAlertMessage) {
                    pageAlertMessage.innerHTML = "<strong>Halo pengunjung!</strong><br>Selamat datang di halaman Pesan dan Kesan 💌.<br>Harap tidak mengirim pesan-pesan atau kalimat-kalimat yang aneh yaa, terima kasih 🛡️";
                    pageAlertModal.style.display = 'flex';
                    setTimeout(() => { pageAlertModal.style.opacity = '1'; }, 10);
                    pageAlertModal.classList.add('active');
                }
            }
        }, 600); 
    }

    // Fungsi Tombol "Oke, Saya Mengerti!" untuk menutup pop-up
    if (btnPageAlertOk && pageAlertModal) {
        btnPageAlertOk.addEventListener('click', (e) => {
            e.preventDefault();
            pageAlertModal.style.opacity = '0';
            setTimeout(() => { pageAlertModal.style.display = 'none'; }, 300);
            pageAlertModal.classList.remove('active');
        });
    }

    // Secara otomatis menyalakan menu "Beranda" saat website pertama kali dibuka
    switchPage('beranda');

    // Menjalankan fungsi ganti halaman saat tombol menu diklik
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                switchPage(targetId);
            }
        });
    });
});
// 2. TOMBOL DARK/LIGHT MODE
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            if (document.body.classList.contains('dark-mode')) {
                themeBtn.innerText = '☀️ Mode Terang';
            } else {
                themeBtn.innerText = '🌙 Mode Gelap';
            }
        });
    }
});

// 3. FITUR HITUNG MUNDUR (COUNTDOWN KELULUSAN)
// (Script ini diabaikan karena hitung mundurnya sekarang langsung ada di HTML)

// 4. POP-UP BIODATA KARTU PENGURUS/ANGGOTA
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('biodataModal');
    const closeModal = document.getElementById('closeModal');
    const cards = document.querySelectorAll('.card, .siswa-card');

    const mFullName = document.getElementById('m-fullname');
    const mNickname = document.getElementById('m-nickname');
    const mBirthday = document.getElementById('m-birthday');
    const mHobby = document.getElementById('m-hobby');
    const mEskul = document.getElementById('m-eskul');

    if (modal) {
        cards.forEach(card => {
            card.addEventListener('click', () => {
                if(mFullName) mFullName.innerText = card.getAttribute('data-fullname') || 'Belum diisi';
                if(mNickname) mNickname.innerText = card.getAttribute('data-nickname') || 'Belum diisi';
                if(mBirthday) mBirthday.innerText = card.getAttribute('data-birthday') || 'Belum diisi';
                if(mHobby) mHobby.innerText = card.getAttribute('data-hobby') || 'Belum diisi';
                if(mEskul) mEskul.innerText = card.getAttribute('data-eskul') || 'Belum diisi';
                
                modal.style.display = 'flex';
                modal.classList.add('active');
            });
        });

        if(closeModal) {
            closeModal.addEventListener('click', () => {
                modal.style.display = 'none';
                modal.classList.remove('active');
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                modal.classList.remove('active');
            }
        });
    }
});

// 5. POP-UP GALERI (LIGHTBOX) - FIX FINAL FOTO AKURAT 📸
document.addEventListener('DOMContentLoaded', () => {
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    
    // JURUS BARU: Menangkap SEMUA gambar di Galeri Utama dan Galeri Aib!
    const galeriImages = document.querySelectorAll('#galeri img, #galeri-aib img, .galeri-item img'); 

    if (lightboxModal && galeriImages.length > 0) {
        galeriImages.forEach(img => {
            // Memaksa kursor berubah jadi jari saat menyentuh semua foto ini
            img.style.cursor = 'pointer'; 

            img.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Ambil sumber foto yang sedang diklik
                if (lightboxImg) {
                    lightboxImg.src = this.src; 
                }
                
                // Mengambil teks keterangan (caption) jika ada
                const parent = this.parentElement;
                const caption = parent.querySelector('p');
                if (lightboxCaption) {
                    lightboxCaption.innerText = caption ? caption.innerText : '';
                }
                
                // Memunculkan Pop-up
                lightboxModal.style.display = 'flex';
                // Memberi sedikit jeda agar transisinya halus
                setTimeout(() => { lightboxModal.style.opacity = '1'; }, 10);
                lightboxModal.classList.add('active');
            });
        });

        // Fungsi Tombol Silang X
        if (lightboxClose) {
            lightboxClose.addEventListener('click', (e) => {
                e.preventDefault();
                lightboxModal.style.opacity = '0';
                setTimeout(() => { lightboxModal.style.display = 'none'; }, 300);
                lightboxModal.classList.remove('active');
            });
        }

        // Fungsi Klik background hitam untuk menutup foto
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                lightboxModal.style.opacity = '0';
                setTimeout(() => { lightboxModal.style.display = 'none'; }, 300);
                lightboxModal.classList.remove('active');
            }
        });
    }
});

// 6. FIREBASE & SISTEM BUKU TAMU & ADMIN GALAXY
const firebaseConfig = {
    apiKey: "AIzaSyB0CE2A6nMgdR4jH-C2QtmcvVJ8Q-lPorQ",
    authDomain: "website-class-9c.firebaseapp.com",
    databaseURL: "https://website-class-9c-default-rtdb.firebaseio.com",
    projectId: "website-class-9c",
    storageBucket: "website-class-9c.firebasestorage.app",
    messagingSenderId: "468787276862",
    appId: "1:468787276862:web:6fbcfbc69183164e8e756f"
};

if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }
    const database = firebase.database();
    const messagesRef = database.ref('pesan_kelas9c');

    window.isAdmin = false;
    let latestMessagesData = null;

    function escapeHtml(text) {
        if (!text) return '';
        return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function censorName(str) {
        if (!str) return '***';
        return str.split(' ').map(word => {
            if (word.length <= 1) return '*';
            return word[0] + '*'.repeat(word.length - 1);
        }).join(' ');
    }

    document.addEventListener('DOMContentLoaded', () => {
        const messagesList = document.getElementById('messagesList');
        const guestbookForm = document.getElementById('guestbookForm');

        function renderMessagesFromFirebase() {
            if (!messagesList || !latestMessagesData) return;
            messagesList.innerHTML = '';
            
            const messagesArray = [];
            for (let key in latestMessagesData) {
                messagesArray.push({ id: key, ...latestMessagesData[key] });
            }
            messagesArray.reverse();

            messagesArray.forEach((item) => {
                const messageItem = document.createElement('div');
                messageItem.classList.add('message-item');

                const rawName = item.name || 'Anonim';
                const displayName = window.isAdmin ? escapeHtml(rawName) + ' 🔓' : censorName(escapeHtml(rawName));
                const displayClass = escapeHtml(item.userClass || 'IX C');
                const displayMessage = escapeHtml(item.message || '');

                // JURUS BARU: Mengubah angka timestamp menjadi format Tanggal & Jam Indonesia 🕒
                let dateString = "Waktu tidak diketahui";
                if (item.timestamp) {
                    const dateObj = new Date(item.timestamp);
                    const options = { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' };
                    dateString = dateObj.toLocaleDateString('id-ID', options);
                }

                let deleteButtonHTML = `<button class="delete-btn" title="Hapus Pesan" onclick="window.triggerFirebaseDelete('${item.id}', '${escapeHtml(rawName)}')">&times;</button>`;
                
                // Menambahkan <span class="message-date"> ke dalam HTML
                messageItem.innerHTML = `
                    <h4>${displayName} <span class="user-class">Kelas ${displayClass}</span></h4>
                    <p>${displayMessage}</p>
                    <span class="message-date">🗓️ ${dateString}</span>
                    ${deleteButtonHTML}
                `;
                messagesList.appendChild(messageItem);
            });
        }

        messagesRef.on('value', (snapshot) => {
            latestMessagesData = snapshot.val();
            if (latestMessagesData) renderMessagesFromFirebase();
            else if (messagesList) messagesList.innerHTML = '<p style="text-align:center; color:#777;">Belum ada pesan. Jadilah yang pertama!</p>';
        });

        // FITUR WARNING SEBELUM KIRIM PESAN
        if (guestbookForm) {
            const warningModal = document.getElementById('warningModal');
            const btnYakin = document.getElementById('btnYakinKirim');
            const btnUlangi = document.getElementById('btnUlangiKetik');

            guestbookForm.onsubmit = function(e) {
                e.preventDefault(); // Tahan form agar tidak langsung terkirim
                
                const nameEl = document.getElementById('senderName');
                const msgEl = document.getElementById('senderMessage');

                // Jika kolom nama dan pesan sudah diisi, munculkan Pop-up!
                if (nameEl && msgEl && nameEl.value.trim() !== "" && msgEl.value.trim() !== "") {
                    warningModal.style.display = 'flex';
                    setTimeout(() => { warningModal.style.opacity = '1'; }, 10);
                    warningModal.classList.add('active');
                }
            };
// JIKA TOMBOL "YAKIN KIRIM" DIPENCET
            if (btnYakin) {
                btnYakin.onclick = function(e) {
                    e.preventDefault();
                    
                    // --- FITUR ANTI-SPAM (COOLDOWN 3 MENIT) 🛡️ ---
                    const lastSent = localStorage.getItem('lastMessageSent');
                    const now = Date.now();
                    if (lastSent && now - lastSent < 3 * 60 * 1000) { 
                        alert("Sabar ya! Kamu baru saja mengirim pesan. Tunggu sekitar 3 menit lagi 🛡️");
                        warningModal.style.opacity = '0';
                        setTimeout(() => { warningModal.style.display = 'none'; }, 300);
                        warningModal.classList.remove('active');
                        return; // Hentikan pengiriman
                    }
                    // ----------------------------------------------

                    const nameEl = document.getElementById('senderName');
                    const classEl = document.getElementById('senderClass');
                    const msgEl = document.getElementById('senderMessage');

                    // Kirim ke Firebase
                    messagesRef.push({
                        name: nameEl.value,
                        userClass: classEl && classEl.value.trim() !== "" ? classEl.value : 'IX C',
                        message: msgEl.value,
                        timestamp: now
                    });
                    
                    // Simpan waktu pengiriman terakhir ke memori HP/Laptop pengunjung
                    localStorage.setItem('lastMessageSent', now);

                    guestbookForm.reset(); 
                    
                    warningModal.style.opacity = '0';
                    setTimeout(() => { warningModal.style.display = 'none'; }, 300);
                    warningModal.classList.remove('active');
                    
                    alert("Mantap! Pesan berhasil dikirim ke kelas IX C! 🎉");
                };
            }

            // JIKA TOMBOL "ULANGI MENGETIK" DIPENCET
            if (btnUlangi) {
                btnUlangi.onclick = function(e) {
                    e.preventDefault();
                    // Cukup tutup pop-up dan biarkan pengunjung mengedit teksnya
                    warningModal.style.opacity = '0';
                    setTimeout(() => { warningModal.style.display = 'none'; }, 300);
                    warningModal.classList.remove('active');
                };
            }
        }
        const adminToggleBtn = document.getElementById('adminToggleBtn');
        const adminModalOverlay = document.getElementById('adminModalOverlay');
        const adminPasswordInput = document.getElementById('adminPasswordInput');
        const adminSubmitBtn = document.getElementById('adminSubmitBtn');
        const adminCancelBtn = document.getElementById('adminCancelBtn');

        if (adminToggleBtn && adminModalOverlay) {
            adminToggleBtn.onclick = function(e) {
                e.preventDefault();
                if (window.isAdmin) {
                    window.isAdmin = false;
                    document.body.classList.remove('admin-mode'); 
                    alert("Mode Admin dimatikan. Sensor nama kembali aktif.");
                    adminToggleBtn.innerText = "🔐 Mode Admin";
                    renderMessagesFromFirebase(); 
                } else {
                    adminModalOverlay.style.display = 'flex';
                    adminModalOverlay.classList.add('active');
                    if (adminPasswordInput) {
                        adminPasswordInput.value = '';
                        adminPasswordInput.focus();
                    }
                }
            };
        }

        if (adminCancelBtn) {
            adminCancelBtn.onclick = function(e) {
                e.preventDefault();
                adminModalOverlay.style.display = 'none';
                adminModalOverlay.classList.remove('active');
            };
        }

        if (adminSubmitBtn) {
            adminSubmitBtn.onclick = function(e) {
                e.preventDefault();
                if (adminPasswordInput && adminPasswordInput.value === "streak") {
                    window.isAdmin = true;
                    document.body.classList.add('admin-mode'); 
                    adminModalOverlay.style.display = 'none';
                    adminModalOverlay.classList.remove('active');
                    alert("Mode Admin Aktif! Semua nama sekarang terlihat.");
                    if (adminToggleBtn) adminToggleBtn.innerText = "🔓 Keluar Mode Admin";
                    renderMessagesFromFirebase(); 
                } else {
                    alert("Password salah!");
                    if (adminPasswordInput) adminPasswordInput.value = '';
                }
            };
        }

        window.triggerFirebaseDelete = function(firebaseId, originalName) {
            if (window.isAdmin) {
                const deleteAdminModal = document.getElementById('deleteAdminModal');
                if (deleteAdminModal) {
                    deleteAdminModal.style.display = 'flex';
                    deleteAdminModal.classList.add('active');
                    
                    const btnSubmit = document.getElementById('deleteAdminSubmitBtn');
                    const btnCancel = document.getElementById('deleteAdminCancelBtn');
                    
                    if (btnCancel) btnCancel.onclick = (e) => {
                        e.preventDefault();
                        deleteAdminModal.style.display = 'none';
                        deleteAdminModal.classList.remove('active');
                    };
                    
                    if (btnSubmit) btnSubmit.onclick = (e) => {
                        e.preventDefault();
                        messagesRef.child(firebaseId).remove();
                        deleteAdminModal.style.display = 'none';
                        deleteAdminModal.classList.remove('active');
                        alert("Pesan berhasil dihapus oleh Admin!");
                    };
                }
            } else {
                const deleteUserModal = document.getElementById('deleteUserModal');
                if (deleteUserModal) {
                    deleteUserModal.style.display = 'flex';
                    deleteUserModal.classList.add('active');
                    
                    const deleteUserNameInput = document.getElementById('deleteUserNameInput');
                    if (deleteUserNameInput) {
                        deleteUserNameInput.value = '';
                        deleteUserNameInput.focus();
                    }

                    const btnSubmit = document.getElementById('deleteUserSubmitBtn');
                    const btnCancel = document.getElementById('deleteUserCancelBtn');

                    if (btnCancel) btnCancel.onclick = (e) => {
                        e.preventDefault();
                        deleteUserModal.style.display = 'none';
                        deleteUserModal.classList.remove('active');
                    };
                    
                    if (btnSubmit) btnSubmit.onclick = (e) => {
                        e.preventDefault();
                        const confirmName = deleteUserNameInput ? deleteUserNameInput.value : '';
                        if (confirmName && confirmName.trim().toLowerCase() === originalName.trim().toLowerCase()) {
                            messagesRef.child(firebaseId).remove();
                            deleteUserModal.style.display = 'none';
                            deleteUserModal.classList.remove('active');
                            alert("Pesan berhasil dihapus!");
                        } else {
                            alert("Nama tidak cocok! Kamu hanya bisa menghapus pesan yang kamu kirim sendiri.");
                        }
                    };
                }
            }
        };
    });
}
// =========================================
// 0. WELCOME SCREEN, WAITING LOADING & MUSIC AUTO-PLAY 🎵
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const welcomeScreen = document.getElementById('welcome-screen');
    const enterBtn = document.getElementById('enter-btn');
    const welcomeInitial = document.getElementById('welcome-initial');
    const welcomeLoader = document.getElementById('welcome-loader');
    const progressBar = document.getElementById('progressBar');
    const progressText = document.getElementById('progressText');
    const audio = document.querySelector('audio');

    if (enterBtn && welcomeScreen) {
        enterBtn.addEventListener('click', () => {
            // 1. Putar musik langsung saat diklik
            if (audio) {
                audio.play().catch(error => console.log("Audio ditahan browser: ", error));
            }

            // 2. Sembunyikan tombol "Masuk", lalu munculkan tampilan Waiting / Loading
            if (welcomeInitial) welcomeInitial.style.display = 'none';
            if (welcomeLoader) welcomeLoader.style.display = 'block';

            // 3. Jalankan efek hitungan persentase 0% -> 100% (DURASI 3-4 DETIK)
            let percent = 0;
            const loadingInterval = setInterval(() => {
                // Angka naik 1% sampai 3% setiap ketukan biar pas durasinya sekitar 2.5 detik
                percent += Math.floor(Math.random() * 1 + 30 & 50);

                if (percent >= 100) {
                    percent = 100;
                    clearInterval(loadingInterval);

                    // Pastikan visual mentok di 100%
                    if (progressBar) progressBar.style.width = '100%';
                    if (progressText) progressText.innerText = '100%';

                    // 4. Tahan selama 1 DETIK PENUH di angka 100% biar mantap
                    setTimeout(() => {
                        // Tambahkan animasi terangkat/memudar
                        welcomeScreen.classList.add('hidden');
                        
                        // JURUS PAMUNGKAS: Hapus total layar agar halaman Beranda bisa diklik
                        setTimeout(() => {
                            welcomeScreen.style.display = 'none';
                        }, 5000);
                        
                    }, 5000); // 1000 milidetik = 1 detik penahanan
                } else {
                    // Update tampilan angka dan garis warna saat belum 100%
                    if (progressBar) progressBar.style.width = percent + '%';
                    if (progressText) progressText.innerText = percent + '%';
                }

            }, 50); // Kecepatan ketukan diatur ke 50 milidetik
        });
    }
});
// =========================================
// 8. FITUR EASTER EGG (KUIS MTK UNTUK BUKA AIB) 🤫 - VERSI POP-UP WARNING
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const btnTebak = document.getElementById('btn-tebak');
    const kuisRahasia = document.getElementById('kuis-rahasia');
    const galeriAib = document.getElementById('galeri-aib');
    
    // Elemen Pop-up baru
    const aibWarningModal = document.getElementById('aibWarningModal');
    const btnPahamAib = document.getElementById('btnPahamAib');

    if (btnTebak) {
        btnTebak.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Ambil jawaban dari kotak input
            const j1 = document.getElementById('jawaban1').value.trim();
            const j2 = document.getElementById('jawaban2').value.trim();
            const j3 = document.getElementById('jawaban3').value.trim();

            // KUNCI JAWABAN: Soal 1 = 28, Soal 2 = 17, Soal 3 = 50
            if (j1 === "2500" && j2 === "-7" && j3 === "32") {
                // Munculkan pop-up peringatan rahasia (bukan alert biasa)
                if (aibWarningModal) {
                    aibWarningModal.style.display = 'flex';
                    setTimeout(() => { aibWarningModal.style.opacity = '1'; }, 10);
                    aibWarningModal.classList.add('active');
                }
            } else {
                // Jika ada yang salah
                alert("TETOOOT! ❌ Jawaban MTK ada yang salah. Ayo hitung lagi, kamu belum berhak melihat rahasia IX C!");
            }
        });
    }
    
    // JIKA TOMBOL "Oke, Saya Janji!" DIPENCET
    if (btnPahamAib) {
        btnPahamAib.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. Tutup pop-up nya
            if (aibWarningModal) {
                aibWarningModal.style.opacity = '0';
                setTimeout(() => { aibWarningModal.style.display = 'none'; }, 300);
                aibWarningModal.classList.remove('active');
            }
            
            // 2. Sembunyikan soal MTK-nya & Munculkan Galeri Aibnya!
            if (kuisRahasia) kuisRahasia.style.display = 'none'; 
            if (galeriAib) {
                galeriAib.style.display = 'block';  
                // Sedikit efek gulir otomatis ke galeri
                window.scrollTo({ top: galeriAib.offsetTop - 80, behavior: 'smooth' });
            }
        });
    }
});
// =========================================
// 🚀 5 FITUR PREMIUM BARU 
// =========================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. KOTAK PENCARIAN ANGGOTA 🔍
    const searchInput = document.getElementById('searchAnggota');
    const siswaCards = document.querySelectorAll('.siswa-card');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const keyword = e.target.value.toLowerCase();
            siswaCards.forEach(card => {
                const nama = card.innerText.toLowerCase();
                if (nama.includes(keyword)) {
                    card.style.display = 'flex'; // Munculkan
                } else {
                    card.style.display = 'none'; // Sembunyikan
                }
            });
        });
    }

    // 2. TOMBOL PLAY/PAUSE MUSIK 🎵
    const musicBtn = document.getElementById('musicToggleBtn');
    const audio = document.querySelector('audio');
    if (musicBtn && audio) {
        musicBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                musicBtn.innerText = '🔊';
            } else {
                audio.pause();
                musicBtn.innerText = '🔇';
            }
        });
    }

    // 3. HIGHLIGHT HARI INI DI JADWAL & PIKET 📅
    const hariIni = new Date().getDay(); // 0 = Minggu, 1 = Senin, dst.
    const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const teksHariIni = namaHari[hariIni];
    
    // Cari jadwal dan piket yang tulisannya dimulai dengan nama hari ini
    const listJadwalPiket = document.querySelectorAll('.jadwal-box li, .piket-box li');
    listJadwalPiket.forEach(li => {
        if (li.innerText.toLowerCase().startsWith(teksHariIni.toLowerCase())) {
            li.classList.add('highlight-hari');
            li.innerHTML += ' <span class="badge-hari">Hari Ini! ✨</span>';
        }
    });

});

// 4. MENGUBAH ALERT BAWAAN MENJADI TOAST NOTIFICATION 🍞
// (Ditaruh di luar DOMContentLoaded agar langsung aktif menimpa alert lama)
window.alert = function(message) {
    const toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) return;
    
    const toast = document.createElement('div');
    toast.className = 'toast-msg';
    toast.innerText = message;
    
    // Jika pesannya berupa peringatan/salah, ubah garis kirinya jadi merah
    if(message.toLowerCase().includes('salah') || message.toLowerCase().includes('tunggu') || message.toLowerCase().includes('tetoot') || message.toLowerCase().includes('tidak cocok')) {
        toast.style.borderLeft = '5px solid #e74c3c';
    }
    
    toastContainer.appendChild(toast);
    
    // Efek masuk meluncur
    setTimeout(() => toast.classList.add('show'), 10);
    
    // Hilang otomatis setelah 3.5 detik
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400); // Hapus elemen dari HTML
    }, 3500);
};
// =========================================
// 🛡️ FITUR KEAMANAN (ANTI KLIK KANAN & ANTI SHORTCUT)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Matikan Klik Kanan (Mencegah 'Save Image As' di Laptop/PC)
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault(); // Menghentikan klik kanan
        
        // Memunculkan Toast Notifikasi warna merah yang sudah kita buat sebelumnya
        window.alert("⛔ Maaf, fitur klik kanan dimatikan untuk menjaga privasi foto IX C.");
    });

    // 2. Matikan Shortcut Keyboard Jahat (Mencegah buka kodingan web / Save web)
    document.addEventListener('keydown', function(e) {
        // Mencegah F12 atau Ctrl+Shift+I (Membuka Developer Tools untuk mencuri foto)
        if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'J' || e.key === 'C'))) {
            e.preventDefault();
            window.alert("⛔ Akses Developer ditolak! Privasi dijaga ketat.");
            return false;
        }
        
        // Mencegah Ctrl+U (Melihat source code) atau Ctrl+S (Menyimpan halaman)
        if (e.ctrlKey && (e.key === 'U' || e.key === 'u' || e.key === 'S' || e.key === 's')) {
            e.preventDefault();
            window.alert("⛔ Mau ngapain hayo? Dilarang menyimpan halaman ini ya!");
            return false;
        }
    });
});
// =========================================
// 🎲 FITUR GACHA QUOTES 50 KATA-KATA 
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const quotesIXC = [
        "Usaha tanpa doa itu sombong, doa tanpa usaha itu bohong. 🙏",
        "Capek boleh, nyerah jangan! Tetap semangat! 💪",
        "Jangan takut gagal, takutlah kalau kamu nggak pernah mencoba.",
        "Hari ini adalah kesempatan baru untuk jadi lebih baik. ✨",
        "Masa depan adalah milik mereka yang yakin pada mimpinya.",
        "Sukses itu berawal dari niat, bukan dari rebahan. 🛏️",
        "Jangan bandingkan prosesmu dengan orang lain. Kamu unik!",
        "Jadilah versi terbaik dari dirimu sendiri hari ini.",
        "Senyum sedikit dong, biar harimu makin cerah! ☀️",
        "Belajar keras hari ini, bersantai kemudian. 📚",
        "Jangan lupa bersyukur untuk hal kecil hari ini.",
        "Kesalahan adalah bukti bahwa kamu sedang mencoba.",
        "Waktu terus berjalan, manfaatkan sebaik mungkin. ⏳",
        "Kalau bukan sekarang, kapan lagi? Kalau bukan kamu, siapa lagi?",
        "Boleh istirahat, tapi ingat tujuan awalku.",
        "Percaya deh, hasil nggak akan mengkhianati usaha. 🏆",
        "Jadilah alasan seseorang tersenyum hari ini.",
        "Jangan overthinking, jalani saja sebaik-baiknya. 🍃",
        "Setiap langkah kecil membawamu lebih dekat ke impian.",
        "Kegagalan adalah guru yang paling jujur.",
        "Tetap rendah hati, seberapapun tingginya prestasimu.",
        "Nikmati prosesnya, karena sukses butuh waktu. 🕰️",
        "Jangan biarkan omongan orang mematikan mimpimu.",
        "Orang hebat tidak dihasilkan dari kemudahan.",
        "Beranilah bermimpi besar, dan beranilah untuk gagal.",
        "Teman sejati selalu ada di saat suka dan duka. 🤝",
        "Fokus pada solusi, bukan pada masalah.",
        "Berbuat baiklah tanpa mengharapkan balasan.",
        "Cintai dirimu sendiri sebelum mencintai orang lain. ❤️",
        "Pintar itu penting, tapi adab jauh lebih penting.",
        "Jangan menunda apa yang bisa kamu kerjakan sekarang.",
        "Baca buku hari ini, pimpin dunia esok hari. 📖",
        "Jangan pernah berhenti belajar dari kehidupan.",
        "Kesulitan hari ini adalah kekuatanmu di masa depan.",
        "Bersyukur membuat apa yang kita miliki menjadi cukup.",
        "Teruslah melangkah, walau terkadang jalannya menanjak. 🧗",
        "Hargai prosesmu, sekecil apapun itu.",
        "Hidup itu singkat, buatlah berarti.",
        "Jangan membatasi dirimu, potensi itu tak terbatas! 🚀",
        "Doa ibu adalah jalur VIP menuju sukses.",
        "Berani mencoba adalah separuh dari keberhasilan.",
        "Sukses adalah kumpulan kegagalan yang menolak menyerah.",
        "Jatuh 7 kali, bangkit 8 kali! 🔥",
        "Tidak ada rahasia sukses selain persiapan dan kerja keras.",
        "Mulailah dari mana kamu berada, gunakan yang kamu miliki.",
        "Kebaikan akan selalu kembali kepadamu. ♻️",
        "Jangan ragu meminta tolong jika kamu butuh.",
        "Ingatlah untuk selalu bahagia hari ini!",
        "Kompak selalu IX C, we are the best! 🎉",
        "Hari ini pasti lebih baik dari kemarin. Gas terus! 🛵"
    ];

    const gachaModal = document.getElementById('gachaModal');
    const hariSapaan = document.getElementById('hariSapaan');
    const quoteDisplay = document.getElementById('quoteDisplay');
    const btnGacha = document.getElementById('btnGacha');
    const btnTutupGacha = document.getElementById('btnTutupGacha');

    // Menentukan Hari Ini
    const namaHari = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const hariIni = new Date().getDay();
    if (hariSapaan) hariSapaan.innerText = "Kamu berkunjung di hari " + namaHari[hariIni] + "! 📅";

    // 🌟 MEMUNCULKAN GACHA SETELAH WELCOME SCREEN HILANG
    // Kita cek tombol 'enter-btn' agar Gacha muncul pas layarnya terbuka
    const enterBtn = document.getElementById('enter-btn');
    if (enterBtn && gachaModal) {
        enterBtn.addEventListener('click', () => {
            // Kita kasih jeda waktu sesuai durasi loading Welcome Screen kamu (sekitar 1 detik / 1000ms)
            setTimeout(() => {
                gachaModal.style.display = 'flex';
                setTimeout(() => gachaModal.style.opacity = '1', 10);
                gachaModal.classList.add('active');
            }, 1000); 
        });
    }

    // FUNGSI TOMBOL GACHA (DENGAN EFEK ACAK CEPAT)
    if (btnGacha) {
        btnGacha.addEventListener('click', () => {
            btnGacha.disabled = true;
            btnGacha.innerText = "Mengacak... 🎲";
            
            let acakan = 0;
            // Efek rolling gacha berputar cepat selama 1,5 detik
            const rollInterval = setInterval(() => {
                const acakCepat = quotesIXC[Math.floor(Math.random() * quotesIXC.length)];
                quoteDisplay.innerHTML = `<p style="font-size: 1.1rem; color: #34495e; font-weight: bold;">${acakCepat}</p>`;
                acakan++;
                
                // Berhenti setelah 15 putaran (sekitar 1.5 detik)
                if (acakan > 15) {
                    clearInterval(rollInterval);
                    const hasilFinal = quotesIXC[Math.floor(Math.random() * quotesIXC.length)];
                    quoteDisplay.innerHTML = `<p style="font-size: 1.2rem; color: #1ed598; font-weight: bold; text-shadow: 1px 1px 2px rgba(0,0,0,0.1);">🎉 "${hasilFinal}" 🎉</p>`;
                    
                    btnGacha.style.display = 'none'; // Sembunyikan tombol Gacha
                    btnTutupGacha.style.display = 'block'; // Munculkan tombol Lanjut
                }
            }, 100);
        });
    }

    // FUNGSI TOMBOL TUTUP
    if (btnTutupGacha) {
        btnTutupGacha.addEventListener('click', () => {
            gachaModal.style.opacity = '0';
            setTimeout(() => { gachaModal.style.display = 'none'; }, 300);
            gachaModal.classList.remove('active');
        });
    }
});