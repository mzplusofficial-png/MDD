import React, { useState } from 'react';
import { 
  ArrowLeft, BookOpen, CheckCircle2, Circle, Play, 
  Download, ArrowRight, ArrowLeft as ArrowLeftIcon, Sparkles, 
  Clock, FileText, Check, ChevronDown, ChevronUp, ExternalLink,
  Award, ShieldCheck, Share2, Users, FolderOpen, Lock
} from 'lucide-react';
import { Course, Lesson, User } from '../types';

interface CourseAcademyPageProps {
  course: Course;
  completedLessons: string[];
  onToggleLesson: (lessonId: string) => void;
  currentUser: User | null;
  onBack: () => void;
  onGoToAffiliation: () => void;
  onGoToMegaPack: () => void;
  onGoToCommunity: () => void;
}

export const CourseAcademyPage: React.FC<CourseAcademyPageProps> = ({
  course,
  completedLessons,
  onToggleLesson,
  currentUser,
  onBack,
  onGoToAffiliation,
  onGoToMegaPack,
  onGoToCommunity
}) => {
  // Flatten all lessons to enable easy prev/next navigation
  const allLessons = course.modules.flatMap(m => m.lessons);
  
  const [activeLessonId, setActiveLessonId] = useState<string>(
    allLessons[0]?.id || 'les_01'
  );
  const [expandedModuleId, setExpandedModuleId] = useState<string>(
    course.modules[0]?.id || 'mod_01'
  );
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  // Find active lesson and its parent module
  const currentLesson = allLessons.find(l => l.id === activeLessonId) || allLessons[0];
  const currentModule = course.modules.find(m => m.lessons.some(l => l.id === currentLesson?.id)) || course.modules[0];

  const currentLessonIndex = allLessons.findIndex(l => l.id === currentLesson?.id);
  const prevLesson = currentLessonIndex > 0 ? allLessons[currentLessonIndex - 1] : null;
  const nextLesson = currentLessonIndex < allLessons.length - 1 ? allLessons[currentLessonIndex + 1] : null;

  const isCurrentCompleted = currentLesson ? completedLessons.includes(currentLesson.id) : false;

  const totalLessons = allLessons.length;
  const completedCount = completedLessons.length;
  const progressPercent = Math.round((completedCount / (totalLessons || 1)) * 100);

  const handleDownloadResource = (name: string) => {
    setDownloadSuccess(name);
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  const handleNextLesson = () => {
    if (nextLesson) {
      setActiveLessonId(nextLesson.id);
      // Auto-expand the module containing the next lesson
      const parentMod = course.modules.find(m => m.lessons.some(l => l.id === nextLesson.id));
      if (parentMod) setExpandedModuleId(parentMod.id);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handlePrevLesson = () => {
    if (prevLesson) {
      setActiveLessonId(prevLesson.id);
      const parentMod = course.modules.find(m => m.lessons.some(l => l.id === prevLesson.id));
      if (parentMod) setExpandedModuleId(parentMod.id);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white selection:bg-[#4FC3F7]/30 selection:text-white pb-24">
      
      {/* Sticky Navigation Bar */}
      <div className="border-b border-neutral-800 bg-[#0A0A0A]/90 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors group shrink-0"
          >
            <div className="p-1.5 rounded-lg bg-neutral-900 border border-neutral-800 group-hover:border-neutral-700">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span>Retour à l'accueil M.D.D.</span>
          </button>

          {/* Progress Tracker in Top Bar */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs">
              <span className="text-neutral-400 font-mono">Progression :</span>
              <span className="font-bold text-[#FFD700] font-mono">{progressPercent}%</span>
              <span className="text-[11px] text-neutral-500 font-mono">({completedCount}/{totalLessons} leçons)</span>
            </div>
            
            <div className="w-28 sm:w-36 h-2 bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
              <div 
                className="h-full bg-gradient-to-r from-[#4FC3F7] to-[#FFD700] transition-all duration-500 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-[#4FC3F7]/10 text-[#4FC3F7] border border-[#4FC3F7]/30 font-bold uppercase tracking-wider text-[10px] hidden md:inline">
              Option 3 &bull; Académie Vidéo
            </span>
          </div>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Hero Header */}
        <div className="max-w-4xl mx-auto text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-xs font-mono font-bold text-[#4FC3F7] uppercase tracking-wider mb-4 shadow-lg shadow-cyan-500/5">
            <BookOpen className="w-3.5 h-3.5 text-[#4FC3F7]" />
            <span>FORMATION OPÉRATIONNELLE &bull; OPTION 3</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.1] mb-4 text-balance">
            L'ACADÉMIE VIDÉO DES MILLIONNAIRES DU DIGITAL
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl mx-auto">
            5 modules complets pour apprendre à vendre des produits digitaux en Afrique francophone : acquisition de trafic sans budget publicitaire, conversion WhatsApp et automatisation des encaissements.
          </p>
        </div>

        {/* 2-Column Classroom Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Content Area: Video Player & Lesson Details (8 Col) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Cinematic Video Player Container */}
            <div className="bg-black border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="aspect-video w-full relative bg-neutral-950 flex items-center justify-center">
                
                {/* Styled Video Frame Mockup / Video Player */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none z-10" />

                {/* Video Backdrop visual */}
                <div className="absolute inset-0 flex items-center justify-center bg-neutral-950">
                  <div className="text-center p-6 space-y-4 max-w-md z-20">
                    <div className="w-16 h-16 rounded-full bg-[#4FC3F7]/20 border border-[#4FC3F7]/50 text-[#4FC3F7] flex items-center justify-center mx-auto shadow-xl shadow-[#4FC3F7]/20 hover:scale-105 transition-transform cursor-pointer">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>

                    <div>
                      <span className="text-[11px] font-mono text-[#FFD700] uppercase font-bold tracking-wider block mb-1">
                        Lecture Cours Vidéo HD &bull; {currentLesson.durationMinutes} minutes
                      </span>
                      <h3 className="text-lg sm:text-xl font-bold text-white leading-snug">
                        {currentLesson.title}
                      </h3>
                      <p className="text-xs text-neutral-400 mt-1">
                        {currentModule.title}
                      </p>
                    </div>

                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-900/90 border border-neutral-800 text-[11px] text-neutral-300">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span>Serveur de streaming haute vitesse actif</span>
                    </div>
                  </div>
                </div>

                {/* Embedded controls footer inside player */}
                <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between text-xs text-neutral-300">
                  <span className="font-mono text-[11px]">Durée : {currentLesson.durationMinutes} min</span>
                  <span className="text-[11px] font-mono text-neutral-400">Qualité : 1080p HD</span>
                </div>
              </div>
            </div>

            {/* Lesson Control & Progress Action Bar */}
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[#4FC3F7] uppercase tracking-wider">
                    {currentModule.title}
                  </span>
                  <span className="text-neutral-600">&bull;</span>
                  <span className="text-xs font-mono text-neutral-400">
                    Leçon {currentLessonIndex + 1} sur {totalLessons}
                  </span>
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  {currentLesson.title}
                </h2>
              </div>

              {/* Toggle Completed Button */}
              <button
                onClick={() => onToggleLesson(currentLesson.id)}
                className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 transition-all shrink-0 ${
                  isCurrentCompleted
                    ? 'bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/25'
                    : 'bg-[#FFD700] hover:bg-yellow-400 text-black shadow-lg shadow-amber-500/15'
                }`}
              >
                {isCurrentCompleted ? (
                  <>
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <span>Leçon Terminée ✓</span>
                  </>
                ) : (
                  <>
                    <Circle className="w-5 h-5 text-black" />
                    <span>Marquer Comme Terminée</span>
                  </>
                )}
              </button>
            </div>

            {/* Lesson Summary & Key Concepts */}
            <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-neutral-800/80 pb-4">
                <h3 className="text-sm sm:text-base font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFD700]" />
                  <span>Objectifs et Résumé de la Leçon</span>
                </h3>
                <span className="text-xs font-mono text-neutral-500">
                  Temps d'étude : {currentLesson.durationMinutes} min
                </span>
              </div>

              <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
                {currentLesson.summary}
              </p>

              {/* Key Takeaways Box */}
              <div className="p-4 bg-black/60 rounded-xl border border-neutral-800/80 space-y-2.5">
                <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider block">
                  Points Clés à Appliquer :
                </span>
                <ul className="space-y-2 text-xs text-neutral-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4FC3F7] shrink-0 mt-0.5" />
                    <span>Visionnez la vidéo en entier sans sauter de passages clés.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4FC3F7] shrink-0 mt-0.5" />
                    <span>Téléchargez les documents complémentaires et appliquez les exercices sur votre téléphone.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#4FC3F7] shrink-0 mt-0.5" />
                    <span>Partagez vos questions lors de la session live hebdomadaire du samedi soir.</span>
                  </li>
                </ul>
              </div>

              {/* Downloadable Documents associated with lesson */}
              {currentLesson.resources && currentLesson.resources.length > 0 && (
                <div className="pt-4 border-t border-neutral-800/80 space-y-3">
                  <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-wider block">
                    Fichiers &amp; Supports de Cours Associés :
                  </span>

                  <div className="space-y-2">
                    {currentLesson.resources.map((res, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-2.5 overflow-hidden">
                          <div className="p-2 rounded-lg bg-neutral-900 text-[#4FC3F7] shrink-0">
                            <FileText className="w-4 h-4" />
                          </div>
                          <div className="truncate">
                            <span className="font-semibold text-white block truncate">{res.name}</span>
                            <span className="text-[10px] font-mono text-neutral-500 uppercase">{res.type} &bull; {res.size}</span>
                          </div>
                        </div>

                        <button
                          onClick={() => handleDownloadResource(res.name)}
                          className="px-3.5 py-1.5 bg-[#4FC3F7]/10 hover:bg-[#4FC3F7]/20 border border-[#4FC3F7]/30 text-[#4FC3F7] rounded-lg font-bold text-xs flex items-center gap-1.5 shrink-0 transition-colors"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Télécharger</span>
                        </button>
                      </div>
                    ))}
                  </div>

                  {downloadSuccess && (
                    <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-xs text-emerald-400 flex items-center gap-2 font-mono">
                      <Check className="w-4 h-4" />
                      <span>{downloadSuccess} téléchargé avec succès !</span>
                    </div>
                  )}
                </div>
              )}

            </div>

            {/* Prev / Next Navigation Buttons */}
            <div className="flex items-center justify-between gap-4 pt-2">
              <button
                onClick={handlePrevLesson}
                disabled={!prevLesson}
                className={`px-5 py-3 rounded-xl text-xs font-bold flex items-center gap-2 transition-colors ${
                  prevLesson
                    ? 'bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-white'
                    : 'bg-neutral-950 border border-neutral-900 text-neutral-600 cursor-not-allowed'
                }`}
              >
                <ArrowLeftIcon className="w-4 h-4" />
                <span>Leçon Précédente</span>
              </button>

              <button
                onClick={handleNextLesson}
                disabled={!nextLesson}
                className={`px-5 py-3 rounded-xl text-xs font-extrabold flex items-center gap-2 transition-colors ${
                  nextLesson
                    ? 'bg-[#4FC3F7] hover:bg-[#38bdf8] text-black shadow-lg shadow-[#4FC3F7]/15'
                    : 'bg-neutral-900 text-neutral-500 cursor-not-allowed'
                }`}
              >
                <span>Leçon Suivante</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Sidebar Curriculum Accordion (4 Col) */}
          <div className="lg:col-span-4 space-y-5 sticky top-24">
            
            {/* Header Box */}
            <div className="bg-neutral-900/70 border border-neutral-800 rounded-2xl p-5 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#FFD700] uppercase tracking-wider">
                  PROGRAMME DU CURSUS (5 MODULES)
                </span>
                <span className="text-[11px] font-mono text-neutral-400">
                  {totalLessons} Leçons
                </span>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Suivez les modules dans l'ordre pour bâtir des fondations solides avant de lancer vos campagnes.
              </p>
            </div>

            {/* Modules List */}
            <div className="space-y-3">
              {course.modules.map((mod, modIdx) => {
                const isExpanded = expandedModuleId === mod.id;
                const moduleCompletedCount = mod.lessons.filter(l => completedLessons.includes(l.id)).length;
                const isModuleFullyComplete = moduleCompletedCount === mod.lessons.length;

                return (
                  <div
                    key={mod.id}
                    className="bg-neutral-900/50 border border-neutral-800 rounded-2xl overflow-hidden transition-all shadow-md"
                  >
                    {/* Module Accordion Header */}
                    <button
                      onClick={() => setExpandedModuleId(isExpanded ? '' : mod.id)}
                      className="w-full p-4 text-left flex items-start justify-between gap-3 hover:bg-neutral-800/40 transition-colors"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-neutral-800 text-[10px] font-mono font-bold text-[#FFD700] flex items-center justify-center shrink-0">
                            {modIdx + 1}
                          </span>
                          <span className="text-[11px] font-mono text-neutral-400">
                            {moduleCompletedCount}/{mod.lessons.length} terminées
                          </span>
                          {isModuleFullyComplete && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded font-mono">
                              ✓ Validé
                            </span>
                          )}
                        </div>

                        <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                          {mod.title}
                        </h4>
                      </div>

                      <div className="p-1 rounded-lg bg-neutral-800 text-neutral-400 shrink-0 mt-1">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </button>

                    {/* Lessons list in Module */}
                    {isExpanded && (
                      <div className="px-3 pb-3 space-y-1.5 border-t border-neutral-800/60 pt-2 bg-neutral-950/40">
                        {mod.lessons.map((lesson) => {
                          const isSelected = lesson.id === activeLessonId;
                          const isCompleted = completedLessons.includes(lesson.id);

                          return (
                            <button
                              key={lesson.id}
                              onClick={() => {
                                setActiveLessonId(lesson.id);
                                window.scrollTo({ top: 120, behavior: 'smooth' });
                              }}
                              className={`w-full text-left p-2.5 rounded-xl text-xs flex items-center justify-between gap-2.5 transition-all ${
                                isSelected
                                  ? 'bg-[#4FC3F7]/15 text-[#4FC3F7] font-bold border border-[#4FC3F7]/30 shadow-md'
                                  : 'text-neutral-300 hover:text-white hover:bg-neutral-800/50'
                              }`}
                            >
                              <div className="flex items-center gap-2.5 truncate">
                                {isCompleted ? (
                                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                ) : (
                                  <Circle className="w-4 h-4 text-neutral-600 shrink-0" />
                                )}
                                <span className="truncate">{lesson.title}</span>
                              </div>

                              <span className="text-[10px] font-mono text-neutral-500 shrink-0">
                                {lesson.durationMinutes}m
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                  </div>
                );
              })}
            </div>

            {/* Certificate Teaser */}
            <div className="p-4 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-neutral-800 rounded-2xl space-y-2 text-xs">
              <div className="flex items-center gap-2 text-[#FFD700] font-mono font-bold text-[11px] uppercase">
                <Award className="w-4 h-4" />
                <span>Certificat d'Achèvement M.D.D.</span>
              </div>
              <p className="text-neutral-400 text-[11px] leading-relaxed">
                Complétez l'ensemble des 15 leçons pour débloquer votre attestation officielle signée par les mentors M.D.D.
              </p>
            </div>

          </div>

        </div>

        {/* Quick Links to other 3 options */}
        <div className="mt-14 pt-8 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <span className="text-neutral-400">Découvrir les autres pôles M.D.D. :</span>
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onGoToAffiliation}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#FFD700] text-neutral-300 hover:text-[#FFD700] transition-colors"
            >
              Option 1 : Programme d'Affiliation (Sur Invitation)
            </button>
            <button
              onClick={onGoToMegaPack}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-[#4FC3F7] text-neutral-300 hover:text-[#4FC3F7] transition-colors"
            >
              Option 2 : Méga Pack 10 Produits Drive (Prêts à Vendre)
            </button>
            <button
              onClick={onGoToCommunity}
              className="px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-emerald-400 text-neutral-300 hover:text-emerald-400 transition-colors"
            >
              Option 4 : Communauté &amp; Lives du Samedi
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
