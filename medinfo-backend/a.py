import torch

print("🔍 PyTorch versiyonu:", torch.__version__)
print("🔍 CUDA desteği var mı:", torch.cuda.is_available())

if torch.cuda.is_available():
    print("✅ GPU bulundu:", torch.cuda.get_device_name(0))
    print("🔢 CUDA sürümü:", torch.version.cuda)

    # Basit test: Tensor’u GPU’da çalıştır
    x = torch.rand(3, 3).cuda()
    print("GPU üzerinde tensor örneği:\n", x)
else:
    print("❌ CUDA desteklenmiyor, şu anda sadece CPU kullanılabiliyor.")
