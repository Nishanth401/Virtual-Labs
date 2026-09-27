import { DSACategory } from "../dsa-topic-data";

export const ML_ROADMAP_CATEGORIES: DSACategory[] = [
  // ========================================================
  // MODULE 1: FOUNDATIONAL NEURAL NETWORKS (0/1)
  // ========================================================
  {
    id: "dl-foundations",
    name: "1. Foundational Neural Networks",
    shortDesc: "Solving XOR non-linear decision boundaries with multi-layer deep neural networks.",
    iconName: "BrainCircuit",
    topics: [
      {
        id: "dl-xor-dnn",
        slug: "solving-xor-problem-using-dnn",
        title: "Exp 1: Solving XOR Problem Using Deep Neural Networks (DNN)",
        categoryId: "dl-foundations",
        categoryName: "1. Foundational Neural Networks",
        difficulty: "Beginner",
        estimatedTime: "25 mins",
        gfgSearchQuery: "Solving XOR problem using neural network deep learning Python",
        gfgUrl: "https://www.geeksforgeeks.org/exclusive-or-xor-logic-using-neural-network/",
        quickSummary: "Build and train a small feed-forward DNN to learn the non-linearly-separable XOR function, showing why a single-layer perceptron fails but a hidden layer succeeds.",
        keyPoints: [
          "Forward pass: Computes weighted sums through hidden and output layers with ReLU and sigmoid activations.",
          "Binary cross-entropy loss: Measures prediction error for the 4 XOR input pairs (0,0)->0, (0,1)->1, (1,0)->1, (1,1)->0.",
          "Adam optimizer: Updates weights via backpropagated gradients over many epochs until the model fits all 4 cases."
        ],
        diagramTitle: "XOR 2-Layer Feedforward Neural Network Architecture",
        diagram: `  [ x1 ] ──┬──► [ h1 (ReLU) ] ──┬──► [ y (Sigmoid) ]
           │    ▲              │    ▲
  [ x2 ] ──┴────┘ [ h2 (ReLU) ] ──┴────┘
  Input Layer     Hidden Layer       Output Layer (0 or 1)`,
        complexities: [
          {
            operation: "Forward + Backward pass",
            best: "O(epochs·n·W)",
            avg: "O(epochs·n·W)",
            worst: "O(epochs·n·W)",
            space: "O(W)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (XOR DNN)",
            code: `import torch
import torch.nn as nn
import torch.optim as optim

# 1. XOR Dataset: Inputs and Expected Labels
X = torch.tensor([[0.0, 0.0], [0.0, 1.0], [1.0, 0.0], [1.0, 1.0]])
y = torch.tensor([[0.0], [1.0], [1.0], [0.0]])

# 2. 2-Layer Perceptron (1 Hidden Layer with ReLU)
class XORNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.hidden = nn.Linear(2, 4)
        self.relu = nn.ReLU()
        self.output = nn.Linear(4, 1)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        return self.sigmoid(self.output(self.relu(self.hidden(x))))

model = XORNet()
criterion = nn.BCELoss()
optimizer = optim.Adam(model.parameters(), lr=0.05)

# 3. Train over 200 epochs
for epoch in range(200):
    optimizer.zero_grad()
    preds = model(X)
    loss = criterion(preds, y)
    loss.backward()
    optimizer.step()

print("Trained Predictions:")
for inp, pred in zip(X, model(X)):
    print(f"Input: {inp.tolist()} -> Pred: {pred.item():.4f} (Round: {round(pred.item())})")`
          }
        ],
        practiceProblems: [
          {
            title: "Multi-Layer Perceptron (MLP) Implementation",
            difficulty: "Easy",
            url: "https://www.geeksforgeeks.org/multi-layer-perceptron-learning-in-tensorflow/",
            platform: "GeeksforGeeks",
            topicTag: "Deep Learning"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 2: CONVOLUTIONAL NEURAL NETWORKS FOR VISION (0/2)
  // ========================================================
  {
    id: "dl-cnn-vision",
    name: "2. Convolutional Neural Networks for Vision",
    shortDesc: "Convolutional layers, pooling, spatial feature extraction, and facial classification.",
    iconName: "Layers",
    topics: [
      {
        id: "dl-cnn-char-recognition",
        slug: "character-recognition-using-cnn",
        title: "Exp 2: Character Recognition Using Convolutional Neural Networks (CNN)",
        categoryId: "dl-cnn-vision",
        categoryName: "2. Convolutional Neural Networks for Vision",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Handwritten digit character recognition using CNN MNIST",
        gfgUrl: "https://www.geeksforgeeks.org/handwritten-digit-recognition-using-neural-network/",
        quickSummary: "Train a CNN on a digit/character image dataset (e.g. MNIST) to classify handwritten characters.",
        keyPoints: [
          "Convolutional layers: Extract local spatial features (edges, strokes, textures) via learnable 2D filters.",
          "Max-pooling layers: Downsample feature maps to reduce dimensionality and provide translation invariance.",
          "Fully connected + softmax layers: Map extracted multi-channel spatial features to class probability distributions."
        ],
        diagramTitle: "Convolutional Neural Network Pipeline for Character Recognition",
        diagram: `  [ 28x28 Image ] ──► [ Conv2D 3x3 (16) ] ──► [ MaxPool 2x2 ] 
                       ──► [ Conv2D 3x3 (32) ] ──► [ Flatten ] ──► [ Dense(10) Softmax ]`,
        complexities: [
          {
            operation: "Conv+Pool forward pass",
            best: "O(k²·C_in·C_out·H·W)",
            avg: "O(k²·C_in·C_out·H·W)",
            worst: "O(k²·C_in·C_out·H·W)",
            space: "O(feature maps)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (Character CNN)",
            code: `import torch
import torch.nn as nn
import torch.nn.functional as F

class CharCNN(nn.Module):
    def __init__(self, num_classes=10):
        super().__init__()
        # Conv layer: 1 input channel (grayscale), 16 filters, 3x3 kernel
        self.conv1 = nn.Conv2d(1, 16, kernel_size=3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        # Conv layer: 16 input channels, 32 filters, 3x3 kernel
        self.conv2 = nn.Conv2d(16, 32, kernel_size=3, padding=1)
        self.fc1 = nn.Linear(32 * 7 * 7, 128)
        self.fc2 = nn.Linear(128, num_classes)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x))) # 28x28 -> 14x14
        x = self.pool(F.relu(self.conv2(x))) # 14x14 -> 7x7
        x = x.view(x.size(0), -1)           # Flatten
        x = F.relu(self.fc1(x))
        x = self.fc2(x)
        return F.log_softmax(x, dim=1)

model = CharCNN(num_classes=10)
sample_img = torch.randn(1, 1, 28, 28)
output = model(sample_img)
print("Log-probabilities shape:", output.shape)`
          }
        ],
        practiceProblems: [
          {
            title: "MNIST Digit Classifier CNN",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/handwritten-digit-recognition-using-neural-network/",
            platform: "GeeksforGeeks",
            topicTag: "Computer Vision"
          }
        ]
      },
      {
        id: "dl-cnn-face-recognition",
        slug: "face-recognition-using-cnn",
        title: "Exp 3: Face Recognition Using Convolutional Neural Networks (CNN)",
        categoryId: "dl-cnn-vision",
        categoryName: "2. Convolutional Neural Networks for Vision",
        difficulty: "Intermediate",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Face recognition using CNN deep learning data augmentation",
        gfgUrl: "https://www.geeksforgeeks.org/face-recognition-using-deep-learning/",
        quickSummary: "Extend the CNN architecture (deeper conv stack + dropout) to recognize individual faces from an image dataset, using data augmentation to improve generalization.",
        keyPoints: [
          "Deeper conv/pool stacks: Learn increasingly abstract facial features from edges to eye/nose contours to full identity profiles.",
          "Dropout regularization: Prevents feature co-adaptation and reduces overfitting on small face training datasets.",
          "Image data augmentation: Rotations, horizontal flips, zooming, and color jitters synthetically expand training variance."
        ],
        diagramTitle: "Deep Face Recognition with Augmentation & Dropout",
        diagram: `  [ Face Image ] ──► [ Data Augmentation (Flip/Rotate) ]
                      ──► [ Deep Conv Block x3 ] ──► [ Dropout (0.5) ] ──► [ Identity Softmax ]`,
        complexities: [
          {
            operation: "Training over augmented batches",
            best: "O(epochs·batches·conv_cost)",
            avg: "O(epochs·batches·conv_cost)",
            worst: "O(epochs·batches·conv_cost)",
            space: "O(model params + batch)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (Deep Face CNN)",
            code: `import torch
import torch.nn as nn
from torchvision import transforms

# 1. Data Augmentation Pipeline
face_transforms = transforms.Compose([
    transforms.RandomHorizontalFlip(p=0.5),
    transforms.RandomRotation(degrees=15),
    transforms.ColorJitter(brightness=0.2, contrast=0.2),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.5], std=[0.5])
])

# 2. Deep Face Recognition CNN with Dropout
class DeepFaceNet(nn.Module):
    def __init__(self, num_identities=50):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, 3, padding=1), nn.BatchNorm2d(32), nn.ReLU(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(32, 64, 3, padding=1), nn.BatchNorm2d(64), nn.ReLU(),
            nn.MaxPool2d(2, 2),
            nn.Conv2d(64, 128, 3, padding=1), nn.BatchNorm2d(128), nn.ReLU(),
            nn.MaxPool2d(2, 2)
        )
        self.classifier = nn.Sequential(
            nn.Dropout(0.5),
            nn.Linear(128 * 8 * 8, 256),
            nn.ReLU(),
            nn.Dropout(0.3),
            nn.Linear(256, num_identities)
        )

    def forward(self, x):
        feat = self.features(x)
        return self.classifier(feat.view(feat.size(0), -1))

model = DeepFaceNet(num_identities=50)
print("DeepFaceNet initialized with 3 conv blocks and dual dropout.")`
          }
        ],
        practiceProblems: [
          {
            title: "Face Identification with PyTorch",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/face-recognition-using-deep-learning/",
            platform: "GeeksforGeeks",
            topicTag: "Computer Vision"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 3: RECURRENT NETWORKS & SEQUENCE MODELING (0/3)
  // ========================================================
  {
    id: "dl-recurrent-nlp",
    name: "3. Recurrent Networks & Sequence Modeling",
    shortDesc: "Language modeling with RNNs, emotion sentiment with LSTMs, and Seq2Seq POS tagging.",
    iconName: "Network",
    topics: [
      {
        id: "dl-rnn-language-model",
        slug: "language-modeling-using-rnn",
        title: "Exp 4: Language Modeling Using Recurrent Neural Networks (RNN)",
        categoryId: "dl-recurrent-nlp",
        categoryName: "3. Recurrent Networks & Sequence Modeling",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Recurrent neural network language modeling PyTorch",
        gfgUrl: "https://www.geeksforgeeks.org/introduction-to-recurrent-neural-network/",
        quickSummary: "Train an LSTM-based language model on sample text to predict the next word given a sequence of preceding words.",
        keyPoints: [
          "Tokenization & n-grams: Text is tokenized into vocabulary indices and converted into sliding n-gram sequence pairs.",
          "Embedding layer: Maps sparse word integers into dense vector representations before sequence processing.",
          "Generative autoregression: Generates novel text by iteratively predicting and appending the highest probability next token."
        ],
        diagramTitle: "Autoregressive RNN Language Model Unfolded in Time",
        diagram: `  [ w_(t-1) ] ──► [ Embedding ] ──► [ RNN Cell ] ──► [ Softmax ] ──► Predict [ w_t ]
                                         ▲
                                         │ Hidden State h_(t-1)
                                   [ Previous Step ]`,
        complexities: [
          {
            operation: "Sequence forward pass",
            best: "O(T·H²)",
            avg: "O(T·H²)",
            worst: "O(T·H²)",
            space: "O(T·H)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (RNN Language Model)",
            code: `import torch
import torch.nn as nn

class RNNLanguageModel(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.rnn = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc = nn.Linear(hidden_dim, vocab_size)

    def forward(self, x, hidden=None):
        embeds = self.embedding(x)
        out, hidden = self.rnn(embeds, hidden)
        logits = self.fc(out)
        return logits, hidden

# Vocabulary size: 1000 words, Embedding: 64, Hidden: 128
model = RNNLanguageModel(vocab_size=1000, embed_dim=64, hidden_dim=128)
sample_sequence = torch.randint(0, 1000, (2, 10)) # Batch: 2, Seq Len: 10
logits, _ = model(sample_sequence)
print("Logits Shape (Batch, Seq, Vocab):", logits.shape)`
          }
        ],
        practiceProblems: [
          {
            title: "Text Generation using RNN in PyTorch",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/introduction-to-recurrent-neural-network/",
            platform: "GeeksforGeeks",
            topicTag: "NLP"
          }
        ]
      },
      {
        id: "dl-lstm-sentiment",
        slug: "sentiment-analysis-using-lstm",
        title: "Exp 5: Sentiment Analysis Using Long Short-Term Memory (LSTM) Networks",
        categoryId: "dl-recurrent-nlp",
        categoryName: "3. Recurrent Networks & Sequence Modeling",
        difficulty: "Intermediate",
        estimatedTime: "30 mins",
        gfgSearchQuery: "Sentiment analysis using LSTM PyTorch",
        gfgUrl: "https://www.geeksforgeeks.org/sentiment-analysis-using-lstm/",
        quickSummary: "Build a stacked LSTM classifier that reads a sentence and predicts its emotion label (happy, sad, angry, scared, etc.).",
        keyPoints: [
          "LSTM cell gating: Input, forget, and output gates regulate gradient flow and preserve long-range contextual dependencies.",
          "Stacked LSTM architecture: Hierarchical recurrent layers with dropout extract deep semantic patterns while limiting overfitting.",
          "Dense softmax output: Converts the final hidden state vector into a multi-class emotion probability distribution."
        ],
        diagramTitle: "Stacked LSTM Architecture for Sentiment / Emotion Classification",
        diagram: `  "I love this lab!" ──► [ Embedding ] ──► [ LSTM Layer 1 ] ──► [ LSTM Layer 2 ] 
                                                                         │
                                                                   [ Final h_T ]
                                                                         ▼
                                                                [ Softmax ] ──► Emotion: Happy`,
        complexities: [
          {
            operation: "Sequence forward pass",
            best: "O(T·H²)",
            avg: "O(T·H²)",
            worst: "O(T·H²)",
            space: "O(T·H)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (Emotion Classifier LSTM)",
            code: `import torch
import torch.nn as nn

class EmotionLSTM(nn.Module):
    def __init__(self, vocab_size, embed_dim, hidden_dim, num_emotions=5, dropout=0.3):
        super().__init__()
        self.embedding = nn.Embedding(vocab_size, embed_dim)
        self.lstm = nn.LSTM(
            embed_dim, hidden_dim, num_layers=2, 
            batch_first=True, dropout=dropout
        )
        self.fc = nn.Linear(hidden_dim, num_emotions)

    def forward(self, x):
        embedded = self.embedding(x)
        _, (hn, _) = self.lstm(embedded)
        # Take the hidden state of the top LSTM layer at the final time step
        final_h = hn[-1]
        return self.fc(final_h)

# Emotions: [Happy, Sad, Angry, Fear, Neutral]
model = EmotionLSTM(vocab_size=5000, embed_dim=128, hidden_dim=128, num_emotions=5)
dummy_sentence = torch.randint(0, 5000, (4, 15)) # 4 sentences, 15 words each
emotion_logits = model(dummy_sentence)
print("Emotion Predictions Shape:", emotion_logits.shape)`
          }
        ],
        practiceProblems: [
          {
            title: "Sentiment Analysis on IMDB Reviews with LSTM",
            difficulty: "Medium",
            url: "https://www.geeksforgeeks.org/sentiment-analysis-using-lstm/",
            platform: "GeeksforGeeks",
            topicTag: "NLP"
          }
        ]
      },
      {
        id: "dl-seq2seq-pos-tagging",
        slug: "parts-of-speech-tagging-using-seq2seq",
        title: "Exp 6: Parts-of-Speech (POS) Tagging Using Sequence-to-Sequence (Seq2Seq) Architecture",
        categoryId: "dl-recurrent-nlp",
        categoryName: "3. Recurrent Networks & Sequence Modeling",
        difficulty: "Advanced",
        estimatedTime: "35 mins",
        gfgSearchQuery: "Parts of speech POS tagging Seq2Seq encoder decoder LSTM",
        gfgUrl: "https://www.geeksforgeeks.org/seq2seq-model-in-machine-learning/",
        quickSummary: "Use an encoder–decoder LSTM model to map an input sentence to a corresponding sequence of POS tags.",
        keyPoints: [
          "Encoder LSTM: Compresses the input sentence sequence into a fixed-length context vector containing syntactic meaning.",
          "Decoder LSTM: Initialized with the encoder context vector, decoding tag predictions sequentially token-by-token.",
          "Autoregressive generation: Feeds previous predicted tag tokens back as input until an <EOS> boundary token is produced."
        ],
        diagramTitle: "Seq2Seq Encoder-Decoder for POS Tagging",
        diagram: `  [ "Antigravity", "builds", "software" ] 
                  ──► [ Encoder LSTM ] ──► [ Context Vector ] 
                                                    │
                                                    ▼
                                            [ Decoder LSTM ] ──► [ NNP, VBZ, NN ]`,
        complexities: [
          {
            operation: "Encoder + Decoder pass",
            best: "O(T·H²)",
            avg: "O(T·H²)",
            worst: "O(T·H²)",
            space: "O(T·H)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (Seq2Seq POS Tagger)",
            code: `import torch
import torch.nn as nn

class Seq2SeqPOSTagger(nn.Module):
    def __init__(self, src_vocab, tag_vocab, embed_dim, hidden_dim):
        super().__init__()
        self.encoder_embed = nn.Embedding(src_vocab, embed_dim)
        self.encoder = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        
        self.decoder_embed = nn.Embedding(tag_vocab, embed_dim)
        self.decoder = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.fc_out = nn.Linear(hidden_dim, tag_vocab)

    def forward(self, src, trg_tags):
        src_emb = self.encoder_embed(src)
        _, (hn, cn) = self.encoder(src_emb) # Context state
        
        trg_emb = self.decoder_embed(trg_tags)
        out, _ = self.decoder(trg_emb, (hn, cn))
        return self.fc_out(out)

tagger = Seq2SeqPOSTagger(src_vocab=2000, tag_vocab=25, embed_dim=64, hidden_dim=128)
sample_words = torch.randint(0, 2000, (2, 8))
sample_tags = torch.randint(0, 25, (2, 8))
output_tags = tagger(sample_words, sample_tags)
print("Tagged Output Shape (Batch, Seq, NumTags):", output_tags.shape)`
          }
        ],
        practiceProblems: [
          {
            title: "Sequence to Sequence Learning with Neural Networks",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/seq2seq-model-in-machine-learning/",
            platform: "GeeksforGeeks",
            topicTag: "NLP"
          }
        ]
      }
    ]
  },

  // ========================================================
  // MODULE 4: GENERATIVE MODELS & REAL-WORLD APPLICATIONS (0/2)
  // ========================================================
  {
    id: "dl-generative-apps",
    name: "4. Generative Models & Real-World Applications",
    shortDesc: "Neural machine translation and synthetic image generation using GANs.",
    iconName: "Sparkles",
    topics: [
      {
        id: "dl-encoder-decoder-translation",
        slug: "machine-translation-using-encoder-decoder",
        title: "Exp 7: Machine Translation Using Encoder–Decoder Model",
        categoryId: "dl-generative-apps",
        categoryName: "4. Generative Models & Real-World Applications",
        difficulty: "Advanced",
        estimatedTime: "40 mins",
        gfgSearchQuery: "Neural machine translation encoder decoder LSTM teacher forcing PyTorch",
        gfgUrl: "https://www.geeksforgeeks.org/neural-machine-translation-using-seq2seq-model/",
        quickSummary: "Apply the same encoder–decoder LSTM pattern to translate short sentences from a source language to a target language.",
        keyPoints: [
          "Dual vocabulary embeddings: Source and target vocabularies are tokenized and projected through separate embedding matrices.",
          "Teacher forcing: During training, target ground-truth tokens are fed into the decoder step-by-step to accelerate convergence.",
          "Greedy autoregressive inference: Greedily outputs the highest-probability translated word token sequentially until reaching an end token."
        ],
        diagramTitle: "Neural Machine Translation with Teacher Forcing",
        diagram: `  Source (English): "Antigravity works well" ──► [ Encoder ] ──► [ Context Vector ]
                                                                       │
  Target (French):  "<SOS> Antigravité fonctionne bien" ──► [ Decoder ] ──► Translated Output`,
        complexities: [
          {
            operation: "Encoder + Decoder pass",
            best: "O(T·H²)",
            avg: "O(T·H²)",
            worst: "O(T·H²)",
            space: "O(T·H)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (Machine Translation Seq2Seq)",
            code: `import torch
import torch.nn as nn

class NMTModel(nn.Module):
    def __init__(self, src_vocab, trg_vocab, embed_dim=128, hidden_dim=256):
        super().__init__()
        self.src_embed = nn.Embedding(src_vocab, embed_dim)
        self.trg_embed = nn.Embedding(trg_vocab, embed_dim)
        self.encoder = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.decoder = nn.LSTM(embed_dim, hidden_dim, batch_first=True)
        self.projection = nn.Linear(hidden_dim, trg_vocab)

    def forward(self, src_seq, trg_seq):
        # 1. Encode source text
        src_emb = self.src_embed(src_seq)
        _, (hn, cn) = self.encoder(src_emb)
        
        # 2. Decode with teacher forcing
        trg_emb = self.trg_embed(trg_seq)
        dec_out, _ = self.decoder(trg_emb, (hn, cn))
        return self.projection(dec_out)

model = NMTModel(src_vocab=3000, trg_vocab=3500)
src = torch.randint(0, 3000, (2, 6)) # 2 English sentences of length 6
trg = torch.randint(0, 3500, (2, 7)) # 2 French target sentences
translations = model(src, trg)
print("Translated Prediction Logits:", translations.shape)`
          }
        ],
        practiceProblems: [
          {
            title: "Neural Machine Translation with Attention Mechanism",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/neural-machine-translation-using-seq2seq-model/",
            platform: "GeeksforGeeks",
            topicTag: "Generative AI"
          }
        ]
      },
      {
        id: "dl-gan-image-augmentation",
        slug: "image-augmentation-using-gans",
        title: "Exp 8: Image Augmentation Using Generative Adversarial Networks (GANs)",
        categoryId: "dl-generative-apps",
        categoryName: "4. Generative Models & Real-World Applications",
        difficulty: "Advanced",
        estimatedTime: "40 mins",
        gfgSearchQuery: "Generative adversarial networks GAN image generation PyTorch",
        gfgUrl: "https://www.geeksforgeeks.org/generative-adversarial-networks-gans-pipeline-and-implementation/",
        quickSummary: "Train a simple GAN (generator + discriminator) on an image dataset so the generator learns to synthesize new, realistic images for dataset augmentation.",
        keyPoints: [
          "Generator network: Maps random Gaussian noise vectors into synthetic candidate images matching target dimensions.",
          "Discriminator network: Evaluates whether candidate images are real samples from the dataset or synthetic fakes.",
          "Minimax adversarial optimization: Generator and discriminator compete iteratively until synthesized samples reach photo-realistic fidelity."
        ],
        diagramTitle: "Minimax Generative Adversarial Network (GAN) Workflow",
        diagram: `  [ Latent Noise z ~ N(0,1) ] ──► [ Generator G ] ──► Synthetic Image ──┐
                                                                        ▼
  [ Real Dataset Images x ]   ───────────────────────────────► [ Discriminator D ] ──► Real / Fake Loss`,
        complexities: [
          {
            operation: "Generator + Discriminator training step",
            best: "O(epochs·batch·net_cost)",
            avg: "O(epochs·batch·net_cost)",
            worst: "O(epochs·batch·net_cost)",
            space: "O(model params + batch)"
          }
        ],
        codeSnippets: [
          {
            language: "python",
            label: "PyTorch (DCGAN Architecture)",
            code: `import torch
import torch.nn as nn

# 1. Generator: Maps 100-dim latent vector to 1x28x28 image
class Generator(nn.Module):
    def __init__(self, latent_dim=100):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(latent_dim, 256),
            nn.LeakyReLU(0.2),
            nn.Linear(256, 512),
            nn.LeakyReLU(0.2),
            nn.Linear(512, 28 * 28),
            nn.Tanh()
        )
    def forward(self, z):
        return self.net(z).view(-1, 1, 28, 28)

# 2. Discriminator: Classifies image as Real (1) or Fake (0)
class Discriminator(nn.Module):
    def __init__(self):
        super().__init__()
        self.net = nn.Sequential(
            nn.Linear(28 * 28, 512),
            nn.LeakyReLU(0.2),
            nn.Linear(512, 256),
            nn.LeakyReLU(0.2),
            nn.Linear(256, 1),
            nn.Sigmoid()
        )
    def forward(self, img):
        return self.net(img.view(img.size(0), -1))

gen = Generator(latent_dim=100)
disc = Discriminator()
z = torch.randn(4, 100)
fake_imgs = gen(z)
d_decision = disc(fake_imgs)
print("Generated Synthetic Batch Shape:", fake_imgs.shape)
print("Discriminator Decision Probabilities:", d_decision.squeeze().tolist())`
          }
        ],
        practiceProblems: [
          {
            title: "Generative Adversarial Network (GAN) in PyTorch",
            difficulty: "Hard",
            url: "https://www.geeksforgeeks.org/generative-adversarial-networks-gans-pipeline-and-implementation/",
            platform: "GeeksforGeeks",
            topicTag: "Generative AI"
          }
        ]
      }
    ]
  }
];
