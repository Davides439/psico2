let currentSection = 1;
        let selectedMood = '';
        let userData = {};

        // Manejo de selección de estado de ánimo
        document.querySelectorAll('.mood-option').forEach(option => {
            option.addEventListener('click', function() {
                document.querySelectorAll('.mood-option').forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');
                selectedMood = this.dataset.mood;
            });
        });

        function nextSection(sectionNum) {
            // Validar sección actual
            if (currentSection === 1 && !validateSection1()) return;
            if (currentSection === 2 && !validateSection2()) return;

            // Ocultar sección actual
            document.getElementById(`section${currentSection}`).classList.remove('active');
            
            // Mostrar nueva sección
            currentSection = sectionNum;
            document.getElementById(`section${currentSection}`).classList.add('active');
            
            // Actualizar barra de progreso
            updateProgress();
        }

        function validateSection1() {
            const nombre = document.getElementById('nombre').value.trim();
            const edad = document.getElementById('edad').value;
            
            if (!nombre) {
                alert('Por favor, ingresa tu nombre para continuar.');
                return false;
            }
            if (!edad || edad < 13) {
                alert('Por favor, ingresa una edad válida.');
                return false;
            }
            if (!selectedMood) {
                alert('Por favor, selecciona tu estado emocional actual.');
                return false;
            }
            return true;
        }

        function validateSection2() {
            const estres = document.getElementById('estres').value;
            const sueno = document.getElementById('sueno').value;
            const tiempo_libre = document.getElementById('tiempo_libre').value.trim();
            
            if (!estres || !sueno || !tiempo_libre) {
                alert('Por favor, completa todas las preguntas para continuar con la evaluación.');
                return false;
            }
            return true;
        }

        function updateProgress() {
            const progress = (currentSection / 4) * 100;
            document.getElementById('progressBar').style.width = progress + '%';
        }

        function generateReport() {
            // Mostrar pantalla de carga
            document.getElementById('section3').classList.remove('active');
            document.getElementById('loading').classList.add('active');
            
            // Simular tiempo de procesamiento
            setTimeout(() => {
                // Recopilar datos
                userData = {
                    nombre: document.getElementById('nombre').value.trim(),
                    edad: parseInt(document.getElementById('edad').value),
                    mood: selectedMood,
                    estres: document.getElementById('estres').value,
                    sueno: document.getElementById('sueno').value,
                    tiempo_libre: document.getElementById('tiempo_libre').value.trim(),
                    mayor_miedo: document.getElementById('mayor_miedo').value.trim()
                };

                // Generar el "reporte"
                const report = createPsychologicalReport(userData);
                const emoji = getReportEmoji(userData.mood);
                
                // Mostrar resultado
                document.getElementById('resultContent').innerHTML = report;
                document.getElementById('memeContainer').innerHTML = emoji;
                
                // Cambiar a sección de resultados
                document.getElementById('loading').classList.remove('active');
                document.getElementById('section4').classList.add('active');
                updateProgress();
            }, 3000);
        }

        function createPsychologicalReport(data) {
            let report = `<h3 style="color: #ecf0f1; margin-bottom: 20px;">Análisis para ${data.nombre}</h3>`;
            
            report += `<p style="margin-bottom: 15px;"><strong>Edad:</strong> ${data.edad} años</p>`;
            
            // Aquí es donde se vuelve sarcástico, pero disfrazado como "profesional"
            switch(data.mood) {
                case 'feliz':
                    report += `<p><strong>Estado Emocional:</strong> Reporta sentirse "positivo". Interesante... a tu edad y con esa sonrisa forzada, es como ver a alguien fingiendo que todo está bien mientras su vida se desmorona. Tu felicidad parece más artificial que el azúcar de una coca light.</p>`;
                    break;
                case 'triste':
                    report += `<p><strong>Estado Emocional:</strong> Melancólico. Qué original, ${data.nombre}. A los ${data.edad} años y todavía dramatizando por la vida como si fueras el protagonista de una telenovela. Tu tristeza es tan predecible como el final de Titanic.</p>`;
                    break;
                case 'estresado':
                    report += `<p><strong>Estado Emocional:</strong> Ansioso/Estresado. ¿En serio? Eres el tipo de persona que se estresa hasta por elegir qué cereal desayunar. Tu nivel de ansiedad es más alto que tus expectativas irreales de la vida.</p>`;
                    break;
                case 'aburrido':
                    report += `<p><strong>Estado Emocional:</strong> Neutral/Aburrido. Tu personalidad es tan emocionante como ver pintura secarse. Incluso tu propia reflexión en el espejo se queda dormida.</p>`;
                    break;
            }

            // Análisis del manejo del estrés
            report += `<br><p><strong>Estrategias de Afrontamiento:</strong> `;
            switch(data.estres) {
                case 'ejercicio':
                    report += `Dice hacer ejercicio para el estrés. Seguramente su idea de "cardio intenso" es subir las escaleras corriendo porque se le olvida el teléfono.</p>`;
                    break;
                case 'comida':
                    report += `Maneja el estrés comiendo. Básicamente eres un refrigerador emocional con piernas. Tus sentimientos tienen más grasa saturada que una hamburguesa de McDonald's.</p>`;
                    break;
                case 'netflix':
                    report += `Ve series para relajarse. Eres la razón por la que Netflix pregunta "¿Sigues viendo?" - hasta la plataforma está preocupada por tu salud mental y productividad.</p>`;
                    break;
                case 'procrastino':
                    report += `Procrastina cuando está estresado. Es como intentar apagar un incendio echándole más leña. Tu productividad es tan baja que harías que un perezoso parezca hiperactivo.</p>`;
                    break;
                case 'grito':
                    report += `Expresa sus emociones "verbalmente". Una forma elegante de decir que le grita a objetos inanimados que no pueden huir de ti, a diferencia de las personas.</p>`;
                    break;
            }

            // Análisis del sueño
            switch(data.sueno) {
                case 'mucho':
                    report += `<p><strong>Patrones de Sueño:</strong> Más de 9 horas diarias. Duermes tanto que tu cama ya te está cobrando alquiler. Es impresionante cómo puedes dormir tanto y aún así verte cansado de la vida.</p>`;
                    break;
                case 'normal':
                    report += `<p><strong>Patrones de Sueño:</strong> 7-8 horas. Qué aburrido y responsable. Eres tan predecible que hasta tu rutina de sueño hace bostezar a los demás.</p>`;
                    break;
                case 'poco':
                    report += `<p><strong>Patrones de Sueño:</strong> 5-6 horas. Eres la definición viviente de autosabotaje. Tu cuerpo te odia más que tus ex.</p>`;
                    break;
                case 'insomne':
                    report += `<p><strong>Patrones de Sueño:</strong> Menos de 5 horas. Eres un vampiro sin los beneficios geniales. Tienes más ojeras que un panda deprimido en rehabilitación.</p>`;
                    break;
            }

            // Conclusión "profesional"
            report += `<br><p><strong>Conclusión del Análisis:</strong> Estimado/a ${data.nombre}, después de este exhaustivo análisis psicológico, podemos concluir que tu vida es como una serie que cancelaron en la primera temporada: tenía potencial, pero nadie quiso seguir viéndola.</p>`;
            
            if (data.mayor_miedo && data.mayor_miedo.length > 5) {
                report += `<p>Sobre tus preocupaciones actuales... tranquilo, con el resto de tu personalidad, es lo de menos que deberías preocuparte.</p>`;
            }

            report += `<br><p><strong>Recomendación Profesional:</strong> Necesitas terapia... y nosotros también después de analizar tu caso. Por favor, busca ayuda profesional real. Este consultorio ficticio ya hizo suficiente daño por hoy. 🎭</p>`;

            return report;
        }

        function getReportEmoji(mood) {
            const emojis = {
                'feliz': '🤡',
                'triste': '😭', 
                'estresado': '🤯',
                'aburrido': '😴'
            };
            return emojis[mood] || '💀';
        }

        function shareResults() {
            if (navigator.share) {
                navigator.share({
                    title: 'Mi Evaluación Psicológica',
                    text: 'Acabo de hacer una evaluación psicológica y... bueno, mejor véanlo ustedes mismos 😅',
                    url: window.location.href
                });
            } else {
                // Fallback para browsers que no soportan Web Share API
                const shareText = `Acabo de hacer una "evaluación psicológica" en ${window.location.href} y el resultado fue... revelador 😂`;
                navigator.clipboard.writeText(shareText).then(() => {
                    alert('¡Texto copiado al portapapeles! Ya puedes compartir tu trauma con amigos.');
                });
            }
        }

        // Inicializar barra de progreso
        updateProgress();